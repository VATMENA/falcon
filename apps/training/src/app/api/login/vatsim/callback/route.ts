// app/login/github/callback/route.ts
import {
	OAuthRequestError,
	providerUserAuth,
	validateOAuth2AuthorizationCode,
} from "@lucia-auth/oauth";
import { auth } from "auth";
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
		const tokens = await validateOAuth2AuthorizationCode<AuthorizationResult>(
			code,
			`${VATSIM_URL}/oauth/token`,
			{
				clientId: process.env.TRAINING_CLIENT_ID!,
				redirectUri: process.env.TRAINING_REDIRECT_URI!,
				clientPassword: {
					authenticateWith: "client_secret",
					clientSecret: process.env.TRAINING_CLIENT_SECRET!,
				},
			},
		);

		const response = await fetch(`${VATSIM_URL}/api/user`, {
			headers: {
				Authorization: `Bearer ${tokens.access_token}`,
			},
		});
		const vatsimUser = (await response.json()) as VatsimUser;

		const { getExistingUser, createUser } = providerUserAuth(
			auth,
			"vatsim",
			vatsimUser.data.cid,
		);

		const getUser = async () => {
			const existingUser = await getExistingUser();
			if (existingUser) {
				// update user info
				const user = await auth.updateUserAttributes(existingUser.userId, {
					full_name: vatsimUser.data.personal.name_full,
					rating: vatsimUser.data.vatsim.rating.short,
					subdivision: vatsimUser.data.vatsim.subdivision.id || undefined,
				});
				return user;
			}
			const user = await createUser({
				attributes: {
					cid: vatsimUser.data.cid,
					full_name: vatsimUser.data.personal.name_full,
					rating: vatsimUser.data.vatsim.rating.short,
					subdivision: vatsimUser.data.vatsim.subdivision.id
						? vatsimUser.data.vatsim.subdivision.id
						: "",
					access: false,
					division_role: "Other",
					subdivision_role: "Other",
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
