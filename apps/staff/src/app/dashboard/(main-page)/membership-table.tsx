"use client";

import { DivisionMembersResponse, Subdivision } from "@/types/subdivisions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/ui/table";

export const MembershipTable = ({
  members,
}: {
  members: DivisionMembersResponse;
}) => {
  return members.items.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Subdivision</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>OBS</TableHead>
          <TableHead>S1</TableHead>
          <TableHead>S2</TableHead>
          <TableHead>S3</TableHead>
          <TableHead>C1</TableHead>
          <TableHead>C3</TableHead>
          <TableHead>I1</TableHead>
          <TableHead>I3</TableHead>
          <TableHead>SUP</TableHead>
          <TableHead>ADM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(Subdivision).map((subdivision) => (
          <TableRow key={subdivision}>
            <TableCell>
              {Subdivision[subdivision as keyof typeof Subdivision]}
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id &&
                    member.subdivision_id === subdivision
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 1
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 2
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 3
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 4
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 5
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 7
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision && member.rating === 8
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision &&
                    member.rating === 10
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision &&
                    member.rating === 11
                ).length
              }
            </TableCell>
            <TableCell>
              {
                members.items.filter(
                  (member) =>
                    member.subdivision_id === subdivision &&
                    member.rating === 12
                ).length
              }
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>None</TableCell>
          <TableCell>
            {members.items.filter((member) => !member.subdivision_id).length}
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 1
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 2
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 3
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 4
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 5
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 7
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 8
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 10
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 11
              ).length
            }
          </TableCell>
          <TableCell>
            {
              members.items.filter(
                (member) => !member.subdivision_id && member.rating === 12
              ).length
            }
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{members.count}</TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 1).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 2).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 3).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 4).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 5).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 7).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 8).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 10).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 11).length}
          </TableCell>
          <TableCell>
            {members.items.filter((member) => member.rating === 12).length}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Subdivision</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>OBS</TableHead>
          <TableHead>S1</TableHead>
          <TableHead>S2</TableHead>
          <TableHead>S3</TableHead>
          <TableHead>C1</TableHead>
          <TableHead>C3</TableHead>
          <TableHead>I1</TableHead>
          <TableHead>I3</TableHead>
          <TableHead>SUP</TableHead>
          <TableHead>ADM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>Loading....</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
