"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

import { SignInModal, ToastContainer } from "@/components/shared";

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
      <QueryClientProvider client={queryClient}>
        {children}
        <SignInModal />
        <ToastContainer />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
