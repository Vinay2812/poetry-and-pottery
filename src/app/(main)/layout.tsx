import { MobileHeader, MobileNav, Navbar } from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MobileHeader />
      {children}
      <MobileNav />
    </div>
  );
}
