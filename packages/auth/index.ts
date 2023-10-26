import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "db";
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
      cid: data.cid,
      fullName: data.full_name,
      rating: data.rating,
      subdivision: data.subdivision,
      access: data.access,
      divisionRole: data.division_role,
      subdivisionRole: data.subdivision_role,
    };
  },
});

export type Auth = typeof auth;
