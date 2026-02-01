"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

type LenisProviderProps = {
  children: React.ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  // return children;

  useEffect(() => {}, []);
  // return (
  //   <ReactLenis
  //     root
  //     options={{
  //       lerp: 0.5,
  //       smoothWheel: true,
  //       // syncTouch: true,
  //       autoRaf: true,
  //     }}
  //   >
  //     {children}
  //   </ReactLenis>
  // );
}
