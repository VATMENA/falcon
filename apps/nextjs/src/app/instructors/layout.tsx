export default function PublicInstructorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full h-full flex-col p-8">{children}</div>;
}
