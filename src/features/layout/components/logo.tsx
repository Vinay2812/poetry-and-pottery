import { OptimizedImage } from "@/components/shared";

export function Logo() {
  return (
    <>
      <OptimizedImage
        src="https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.svg"
        alt="Poetry & Pottery"
        width={32}
        height={32}
        className="h-8 w-8 rounded-full"
      />
      <span className="text-foreground text-medium font-bold tracking-tight">
        Poetry & Pottery
      </span>
    </>
  );
}
