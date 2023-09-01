import { auth } from "auth";
import { cookies } from "next/headers";
import { cache } from "react";

export const getUserSession = cache(async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });
  return authRequest.validate();
});
