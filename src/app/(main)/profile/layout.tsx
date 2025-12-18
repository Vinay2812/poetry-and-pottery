import { RouteGuardProvider } from "@/providers/route-guard-provider";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuardProvider fallbackUrl="/sign-in">{children}</RouteGuardProvider>
  );
}
