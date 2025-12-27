import { usePathname } from "next/navigation";

const AUTH_USER_ROUTES = ["/orders", "/profile", "/registrations"];

export function usePathInfo() {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/dashboard");

  const isAuthRequiredRoute = AUTH_USER_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  return { isAdminRoute, isAuthRequiredRoute };
}
