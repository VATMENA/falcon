// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("../lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    full_name: string;
    rating: string;
    access: boolean;
    cid: number;
  };
  type DatabaseSessionAttributes = {};
}
