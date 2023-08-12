import { prisma } from "@/lib/db/prisma";
import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
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
      subdivision: data.subdivison,
      access: data.access,
      solo: data.solo,
      log: data.log,
      upgrade: data.upgrade,
      transfer: data.transfer,
      user: data.user,
      cid: data.cid,
    };
  },
});

export type Auth = typeof auth;
