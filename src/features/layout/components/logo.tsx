"use client";

import { OptimizedImage } from "@/components/shared";

import { useBrandAssetsQuery } from "@/graphql/generated/graphql";

const FALLBACK_LOGO =
  "https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.png";

export function Logo() {
  const { data } = useBrandAssetsQuery();
  const logoSrc = data?.brandAssets?.logo || FALLBACK_LOGO;

  return (
    <>
      <OptimizedImage
        src={logoSrc}
        alt="Poetry & Pottery"
        width={36}
        height={36}
        className="h-9 w-9 rounded-full border-4 border-white bg-white object-contain"
      />
      <span className="font-display text-foreground text-medium tracking-tight">
        Poetry & Pottery
      </span>
    </>
  );
}
