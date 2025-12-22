import { MobileNavContainer, NavbarContainer } from "@/features/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <NavbarContainer />
      {children}
      <MobileNavContainer />
    </div>
  );
}
