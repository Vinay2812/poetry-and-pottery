import { ShoppingCartIcon } from "lucide-react";

export function UserCartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-50 py-12">
      <ShoppingCartIcon className="mb-3 size-12 text-neutral-300" />
      <p className="text-neutral-500">Cart is empty</p>
    </div>
  );
}
