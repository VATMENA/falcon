export const VATSIM_URL =
	process.env.NODE_ENV === "development"
		? "https://auth-dev.vatsim.net"
		: "https://auth.vatsim.net";
