import { DivisionRole, SubdivisionRole } from "db";

export const checkAccess = (
    role: DivisionRole | SubdivisionRole,
    userRole: DivisionRole | SubdivisionRole,
) => {
    switch (userRole) {
        case "Admin":
            return true;
        case "ATC":
            return role === userRole;
        case "Membership":
            return role === userRole;
        case "Director":
            return role === userRole;
        case "Other":
            return false;
    }
};
