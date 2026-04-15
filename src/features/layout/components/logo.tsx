import { OptimizedImage } from "@/components/shared";

export function Logo() {
  return (
    <>
      <OptimizedImage
        src="https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.png"
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
