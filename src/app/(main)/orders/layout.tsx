import { RouteGuardProvider } from "@/providers/route-guard-provider";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuardProvider fallbackUrl="/sign-in">{children}</RouteGuardProvider>
  );
}
