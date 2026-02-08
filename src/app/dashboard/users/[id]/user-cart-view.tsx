import { UserCartEmptyState } from "./user-cart-empty-state";
import { UserCartItemRow } from "./user-cart-item-row";
import { UserCartTotalRow } from "./user-cart-total-row";
import type { UserCartItem } from "./user-cart-types";

interface UserCartViewProps {
  items: UserCartItem[];
}

export function UserCartView({ items }: UserCartViewProps) {
  if (items.length === 0) {
    return <UserCartEmptyState />;
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="space-y-4">
      <div className="divide-y rounded-xl bg-white">
        {items.map((item) => (
          <UserCartItemRow key={item.id} item={item} />
        ))}
      </div>
      <UserCartTotalRow total={total} />
    </div>
  );
}
