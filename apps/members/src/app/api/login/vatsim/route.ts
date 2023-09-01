// app/login/github/route.ts
import { VATSIM_URL } from "@/constants";
import { createOAuth2AuthorizationUrl } from "@lucia-auth/oauth";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const [url, state] = await createOAuth2AuthorizationUrl(
    `${VATSIM_URL}/oauth/authorize`,
    {
      clientId: process.env.MEMBERS_CLIENT_ID!,
      redirectUri: process.env.MEMBERS_REDIRECT_URI!,
      scope: ["full_name vatsim_details email"],
    }
  );
  const cookieStore = cookies();
  // store state
  cookieStore.set("vatsim_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
};
