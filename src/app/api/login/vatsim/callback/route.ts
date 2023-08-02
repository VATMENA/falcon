// app/login/github/callback/route.ts
import { auth, vatsimAuth } from "@/lib/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";
import type { VatsimUser } from "@vatmena/vatsim-lucia";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

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
    const {
      existingUser,
      vatsimUser,
      createUser,
    }: {
      existingUser: Record<any, any> | null;
      vatsimUser: VatsimUser;
      createUser: (options: {
        userId?: string;
        attributes: Record<string, any>;
      }) => Promise<Record<any, any>>;
    } = await vatsimAuth.validateCallback(code);
    const getUser = async () => {
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          full_name: vatsimUser.data.personal.name_full,
          rating: vatsimUser.data.vatsim.rating.short,
          access: false,
          cid: vatsimUser.data.cid,
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
        statusText: e.message,
      });
    }
    console.log(e);
    return new Response(null, {
      status: 500,
    });
  }
};
