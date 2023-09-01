"use client";

import { Log } from "db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "ui/components/ui/table";

export const LogForm = ({ logs }: { logs: Log[] }) => {
  return (
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
            <TableCell suppressHydrationWarning>
              {log.created_at.toDateString()}
            </TableCell>
            <TableCell suppressHydrationWarning>
              {log.created_at.toTimeString()}
            </TableCell>
            <TableCell>{log.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
