import { RouteGuardProvider } from "@/providers/route-guard-provider";

export default function EventRegistrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuardProvider fallbackUrl="/sign-in">{children}</RouteGuardProvider>
  );
}
