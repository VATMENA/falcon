// app/login/github/route.ts
import { VATSIM_URL } from "@/constants";
import { generateState } from "@lucia-auth/oauth";
import { cookies } from "next/headers";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const [url, state] = await createOAuth2AuthorizationUrl(
    `${VATSIM_URL}/oauth/authorize`,
    {
      clientId: process.env.VATSIM_CLIENT_ID!,
      redirectUri: process.env.VATSIM_REDIRECT_URI!,
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

const createOAuth2AuthorizationUrl = async (
  url: string | URL,
  options: {
    clientId: string;
    scope: string[];
    state?: string;
    redirectUri?: string;
    searchParams?: Record<string, string | undefined>;
  }
): Promise<readonly [authorizationUrl: URL, state: string]> => {
  const searchParams = options.searchParams ?? {};
  const state = generateState();
  const authorizationUrl = createUrl(url, {
    response_type: "code",
    client_id: options.clientId,
    scope: options.scope.join(" "),
    state: options.state ?? state,
    redirect_uri: options.redirectUri,
    ...searchParams,
  });
  return [authorizationUrl, state] as const;
};

const createUrl = (
  url: string | URL,
  urlSearchParams: Record<string, string | undefined>
): URL => {
  const newUrl = new URL(url);
  for (const [key, value] of Object.entries(urlSearchParams)) {
    if (!value) continue;
    newUrl.searchParams.set(key, value);
  }
  return newUrl;
};
