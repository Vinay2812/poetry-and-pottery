interface PricePillProps {
  price: number;
}

export function PricePill({ price }: PricePillProps) {
  return (
    <div className="flex h-8 w-16 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur-md dark:bg-black/80 dark:text-white">
      ₹{price.toLocaleString()}
    </div>
  );
}
