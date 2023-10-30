export interface EventResponse {
	data: Event[]
}

export interface Event {
	id: number;
	type: "Event" | "Controller Examination" | "VASOPS Event"
	name: string;
	link: string;
	organisers: Organiser[]
	airports: Airport[]
	routes: Route[]
	start_time: Date;
	end_time: Date;
	short_description: string;
	description: string;
	banner: string;
}

export interface Organiser {
	region: string;
	division: string;
	subdivision: string;
	organised_by_vatsim: boolean;
}

export interface Airport {
	icao: string
}

export interface Route {
	departure: string
	arrival: string;
	route: string
}
