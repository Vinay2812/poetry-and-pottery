interface UserCartTotalRowProps {
  total: number;
}

export function UserCartTotalRow({ total }: UserCartTotalRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-neutral-100 p-4">
      <span className="font-medium">Cart Total</span>
      <span className="text-primary text-xl font-bold">
        ₹{total.toLocaleString("en-IN")}
      </span>
    </div>
  );
}
