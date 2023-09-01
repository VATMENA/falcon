import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Toaster } from "ui/components/toaster";
import "ui/styles/globals.css";

export const metadata: Metadata = {
  title: "VATMENA Members",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="overscroll-none">
        <div className="flex h-full w-full grow flex-col">{children}</div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
