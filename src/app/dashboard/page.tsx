import { getDivisionMembers } from "@/app/dashboard/(main-page)/actions";
import { MembershipTable } from "@/app/dashboard/(main-page)/membership-table";

export const fetchCache = "force-no-store";

export default async function Dashboard() {
  return (
    <>
      <MembershipTable getDivisionMembers={getDivisionMembers} />
    </>
  );
}
