// app/login/github/callback/route.ts
import { auth } from "@/lib/auth/lucia";
import {
  OAuthRequestError,
  __experimental_validateOAuth2AuthorizationCode as getTokens,
  providerUserAuth,
} from "@lucia-auth/oauth";
import { cookies } from "next/headers";

import { VATSIM_URL } from "@/constants";
import { VatsimUser } from "@/types/user";
import type { NextRequest } from "next/server";

type AuthorizationResult = {
  scopes: string[];
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export const GET = async (request: NextRequest) => {
  const cookieStore = cookies();
  const storedState = cookieStore.get("vatsim_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }
  try {
    const tokens = await getTokens<AuthorizationResult>(
      code,
      `${VATSIM_URL}/oauth/token`,
      {
        clientId: process.env.VATSIM_CLIENT_ID!,
        redirectUri: process.env.VATSIM_REDIRECT_URI!,
        clientPassword: {
          authenticateWith: "client_secret",
          clientSecret: process.env.VATSIM_CLIENT_SECRET!,
        },
      }
    );

    const response = await fetch(`${VATSIM_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    const vatsimUser = (await response.json()) as VatsimUser;

    const { existingUser, createUser } = await providerUserAuth(
      auth,
      "vatsim",
      vatsimUser.data.cid
    );

    const getUser = async () => {
      if (existingUser) {
        // update user info
        const user = await auth.updateUserAttributes(existingUser.userId, {
          full_name: vatsimUser.data.personal.name_full,
          rating: vatsimUser.data.vatsim.rating.short,
          subdivision: vatsimUser.data.vatsim.subdivision.id,
        });
        return user;
      }
      const user = await createUser({
        attributes: {
          full_name: vatsimUser.data.personal.name_full,
          rating: vatsimUser.data.vatsim.rating.short,
          subdivision: vatsimUser.data.vatsim.subdivision.id,
          access: false,
          log: false,
          transfer: false,
          upgrade: false,
          solo: false,
          user: false,
          cid: parseInt(vatsimUser.data.cid),
        },
      });
      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const authRequest = auth.handleRequest({ request, cookies });
    authRequest.setSession(session);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/", // redirect to profile page
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    console.log(e);
    return new Response(null, {
      status: 500,
    });
  }
};
