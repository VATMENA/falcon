"use server";
import { VATSIM_API_URL } from "@/lib/vatsim/member";
import { DivisionMembersResponse } from "@/types/subdivisions";

export const getDivisionMembers = async () => {
  const members = await fetch(
    `${VATSIM_API_URL}/orgs/division/MENA?` +
      new URLSearchParams({
        limit: "10000",
      }),
    {
      headers: {
        "X-API-Key": process.env.VATSIM_API_KEY!,
      },
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  return (await members.json()) as DivisionMembersResponse;
};
