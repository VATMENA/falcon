export interface VatsimMember {
  id?: number;
  name_first?: string;
  name_last?: string;
  name_mothermaiden?: string;
  email?: string;
  password?: string;
  age?: number;
  countystate?: string;
  country?: string;
  rating?: number;
  pilotrating?: number;
  militaryrating?: number;
  susp_date?: string;
  susp_prevrat?: number;
  reg_date?: string;
  region_id?: string;
  division_id?: string;
  subdivision_id?: string;
  lastpwdremind?: string;
  lastregionxfer?: string;
  lastratingchange?: string;
  comment: string;
}

export interface VatsimMemberResponse {
  id: number;
  name_first: string;
  name_last: string;
  email: string;
  countystate: string;
  country: string;
  rating: number;
  pilotrating: number;
  militaryrating: number;
  susp_date: string;
  reg_date: string;
  region_id: string;
  division_id: string;
  subdivision_id: string;
  lastratingchange: string;
}

export const VATSIM_API_URL = "https://api.vatsim.net/v2";

export const updateMember = async (memberId: number, member: VatsimMember) => {
  const response = await fetch(VATSIM_API_URL + `/members/${memberId}`, {
    method: "PATCH",
    headers: {
      "X-API-Key": process.env.VATSIM_API_KEY!,
    },
    body: JSON.stringify(member),
  });

  const data = (await response.json()) as VatsimMemberResponse;
  return data;
};
