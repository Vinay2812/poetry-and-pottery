"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
} from "react";
import type { ReactNode } from "react";

import { NavigationProgress } from "@/components/shared";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

interface RouteAnimationContextValue {
  isPending: boolean;
  startNavigation: (action: () => void) => void;
}

const RouteAnimationContext = createContext<RouteAnimationContextValue | null>(
  null,
);

interface RouteAnimationProviderProps {
  children: ReactNode;
}

export function RouteAnimationProvider({
  children,
}: RouteAnimationProviderProps) {
  const [isPending, startTransition] = useTransition();

  const startNavigation = useCallback(
    (action: () => void) => {
      const viewTransitionDocument =
        typeof document === "undefined"
          ? null
          : (document as ViewTransitionDocument);

      if (viewTransitionDocument?.startViewTransition) {
        viewTransitionDocument.startViewTransition(() => {
          startTransition(action);
        });
        return;
      }

      startTransition(action);
    },
    [startTransition],
  );

  const value = useMemo(
    () => ({
      isPending,
      startNavigation,
    }),
    [isPending, startNavigation],
  );

  return (
    <RouteAnimationContext.Provider value={value}>
      <NavigationProgress isActive={isPending} />
      {children}
    </RouteAnimationContext.Provider>
  );
}

export function useRouteAnimation() {
  const context = useContext(RouteAnimationContext);
  if (!context) {
    throw new Error(
      "useRouteAnimation must be used within RouteAnimationProvider",
    );
  }
  return context;
}
