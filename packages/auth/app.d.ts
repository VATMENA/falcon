// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./index").Auth;
    type DatabaseUserAttributes = {
        cid: string;
        full_name: string;
        rating: string;
        subdivision?: string;
        access: boolean;
        division_role: import("db").DivisionRole;
        subdivision_role: import("db").SubdivisionRole;
    };
    type DatabaseSessionAttributes = {};
}
