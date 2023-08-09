"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Log } from "@prisma/client";

export const LogForm = ({ logs }: { logs: Log[] }) => {
  return logs.length > 0 ? (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Created At</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.created_at.toDateString()}</TableCell>
            <TableCell>{log.created_at.toTimeString()}</TableCell>
            <TableCell>{log.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Created At</TableHead>
          <TableHead>Message</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={2}>No logs found.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
