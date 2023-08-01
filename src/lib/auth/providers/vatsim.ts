// import { User } from "@/types/user";
// import {
//   OAuthProvider,
//   OAuthRequestError,
//   generateState,
//   providerUserAuth,
// } from "@lucia-auth/oauth";
// import type { Auth } from "lucia";

// const PROVIDER_ID = "vatsim";

// type Config = {
//   clientId: string;
//   clientSecret: string;
//   scope?: string[];
//   redirectUri: string;
// };

// export const vatsim = <_Auth extends Auth>(auth: _Auth, config: Config) => {
//   const getVatsimTokens = async (code: string) => {
//     const request = new Request(process.env.NODE_ENV === "development" ? "https://auth.vatsim.net/oauth/token" : "https://auth.vatsim.net/oauth/token", {
//       method: "POST",
//       body: new URLSearchParams({
//         client_id: config.clientId,
//         client_secret: config.clientSecret,
//         grant_type: "authorization_code",
//         redirect_uri: config.redirectUri,
//         code,
//       }).toString(),
//     });
//     const tokens = await handleRequest<{
//       access_token: string;
//       expires_in: number;
//       refresh_token: string;
//     }>(request);

//     return {
//       accessToken: tokens.access_token,
//       refreshToken: tokens.refresh_token,
//       accessTokenExpiresIn: tokens.expires_in,
//     };
//   };

//   const getVatsimUser = async (accessToken: string) => {
//     const request = new Request("https://auth.vatsim.net/api/user", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const discordUser = await handleRequest<User>(request);
//     return discordUser;
//   };

//   return {
//     getAuthorizationUrl: async () => {
//       const state = generateState();
//       const url = createUrl("https://auth.vatsim.net/oauth/authorize", {
//         response_type: "code",
//         client_id: config.clientId,
//         scope: scope([], config.scope),
//         redirect_uri: config.redirectUri,
//         state,
//       });
//       return [url, state];
//     },
//     validateCallback: async (code: string) => {
//       const vatsimTokens = await getVatsimTokens(code);
//       const vatsimUser = await getVatsimUser(vatsimTokens.accessToken);
//       const providerUserId = vatsimUser.id;
//       const vatsimUserAuth = await providerUserAuth(
//         auth,
//         PROVIDER_ID,
//         providerUserId
//       );
//       return {
//         ...vatsimUserAuth,
//         vatsimUser,
//         vatsimTokens,
//       };
//     },
//   } as const satisfies OAuthProvider;
// };

// export const handleRequest = async <T extends {}>(request: Request) => {
//   request.headers.set("User-Agent", "lucia");
//   request.headers.set("Accept", "application/json");
//   const response = await fetch(request);
//   if (!response.ok) {
//     throw new OAuthRequestError(request, response);
//   }
//   return (await response.json()) as T;
// };

// export const createUrl = (
//   base: string,
//   urlSearchParams: Record<string, string> = {}
// ) => {
//   const url = new URL(base);
//   for (const [key, value] of Object.entries(urlSearchParams)) {
//     url.searchParams.set(key, value);
//   }
//   return url;
// };

// export const scope = (base: string[], config: string[] = []) => {
//   return [...base, ...(config ?? [])].join(" ");
// };
