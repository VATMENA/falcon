// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("../lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    full_name: string;
    rating: string;
    subdivision?: string;
    access: boolean;
    upgrade: boolean;
    transfer: boolean;
    solo: boolean;
    log: boolean;
    user: boolean;
    cid: number;
  };
  type DatabaseSessionAttributes = {};
}
