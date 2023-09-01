import { VATSIM_API_URL } from "@/lib/vatsim/member";
import { NextResponse } from "next/server";

export const fetchCache = "default-no-store";

export async function GET(
  request: Request,
  { params }: { params: { cid: string } }
) {
  const cid = params.cid;

  const response = await fetch(VATSIM_API_URL + `/members/${cid}`, {
    headers: {
      "X-API-Key": process.env.VATSIM_API_KEY!,
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
}
