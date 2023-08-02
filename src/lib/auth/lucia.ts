import { prisma } from "@/lib/db/prisma";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { vatsim } from "@vatmena/vatsim-lucia";
import { lucia } from "lucia";
import { nextjs } from "lucia/middleware";
import "lucia/polyfill/node";

export const auth = lucia({
  env: "DEV",
  middleware: nextjs(),
  adapter: prismaAdapter(prisma),
  sessionCookie: {
    expires: false,
  },

  getUserAttributes: (data) => {
    return {
      fullName: data.full_name,
      rating: data.rating,
      access: data.access,
      cid: data.cid,
    };
  },
});

export const vatsimAuth = vatsim(auth, {
  clientId: process.env.VATSIM_CLIENT_ID!,
  clientSecret: process.env.VATSIM_CLIENT_SECRET!,
  redirectUri: process.env.VATSIM_REDIRECT_URI!,
  scope: ["full_name vatsim_details email"],
});

export type Auth = typeof auth;
