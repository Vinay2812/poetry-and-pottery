import { OptimizedImage } from "@/components/shared";

export function Logo() {
  return (
    <>
      <OptimizedImage
        src="https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.png"
        alt="Poetry & Pottery"
        width={32}
        height={32}
        className="h-8 w-8 rounded-full bg-white"
      />
      <span className="font-display text-foreground text-medium tracking-tight">
        Poetry & Pottery
      </span>
    </>
  );
}
