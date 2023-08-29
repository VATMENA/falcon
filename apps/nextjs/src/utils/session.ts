import { auth } from "@/lib/auth/lucia";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUserSession = cache(() => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  return authRequest.validate();
});
