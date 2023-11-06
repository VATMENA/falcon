import { DivisionRole, SubdivisionRole } from "db";

type RoleType = "division" | "subdivision";

type Role = {
	division: DivisionRole;
	subdivision: SubdivisionRole;
};

export const checkPermissions = <K extends RoleType>(
	type: K,
	role: Role[K],
	userRole: Role[K],
) => {
	if (type === "division") {
		switch (userRole as DivisionRole) {
			case "Admin":
				return true;
			case "ATC":
				if (role === "Mentor") return true;
				return role === userRole;
			case "Membership":
				return role === userRole;
			case "Other":
				return false;
		}
	}

	if (type === "subdivision") {
		switch (userRole as SubdivisionRole) {
			case "Director":
				if (role === "Mentor") return true;
				if (role === "ATC") return true;
				return role === userRole;
			case "ATC":
				if (role === "Mentor") return true;
				return role === userRole;
			case "Mentor":
				return role === userRole;
			case "Other":
				return false;
		}
	}
};
