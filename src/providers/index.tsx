"use client";

import { AdminRouteGuardProvider } from "@/providers/admin-route-guard-provider";
import { ApolloProvider } from "@/providers/apollo";
import { RouteGuardProvider } from "@/providers/route-guard-provider";
import { StoreProvider } from "@/providers/store-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

import { SignInModal, ToastContainer } from "@/components/shared";
import { TooltipProvider } from "@/components/ui/tooltip";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ClerkProvider>
      <ApolloProvider>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <TooltipProvider>
              <AdminRouteGuardProvider>
                <RouteGuardProvider>{children}</RouteGuardProvider>
              </AdminRouteGuardProvider>
              <SignInModal />
              <ToastContainer />
            </TooltipProvider>
          </StoreProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
}
