import { VatsimMemberResponse } from "@/lib/vatsim/member";

export const Subdivision = {
  ARB: "Arabian vACC",
  JOR: "Jordan vACC",
  MAG: "Maghreb vACC",
  SAU: "Saudi Arabia vACC",
  EGYPT: "Egypt vACC",
  IRN: "Iran vACC",
  NEA: "North East Africa vACC",
} as const;

export interface DivisionMembersResponse {
  items: VatsimMemberResponse[];
  count: number;
}
