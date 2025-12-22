import type { HeroStatsProps } from "../types";

export function HeroStats({
  totalRevenue,
  totalTransactions,
  ordersTotal,
  ordersPending,
  registrationsTotal,
  registrationsPending,
  usersTotal,
  usersNewThisMonth,
}: HeroStatsProps) {
  return (
    <div className="from-primary/10 via-primary/5 rounded-3xl bg-gradient-to-br to-transparent p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s an overview of your store
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            Total Revenue
          </p>
          <p className="text-primary text-3xl font-bold">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground text-sm">
            from {totalTransactions} transactions
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">Orders</p>
          <p className="text-3xl font-bold">{ordersTotal}</p>
          <p className="text-muted-foreground text-sm">
            {ordersPending > 0 && (
              <span className="text-amber-600">{ordersPending} pending</span>
            )}
            {ordersPending === 0 && "All processed"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            Registrations
          </p>
          <p className="text-3xl font-bold">{registrationsTotal}</p>
          <p className="text-muted-foreground text-sm">
            {registrationsPending > 0 && (
              <span className="text-amber-600">
                {registrationsPending} pending
              </span>
            )}
            {registrationsPending === 0 && "All confirmed"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm font-medium">Users</p>
          <p className="text-3xl font-bold">{usersTotal}</p>
          <p className="text-muted-foreground text-sm">
            <span className="text-primary">+{usersNewThisMonth}</span> this
            month
          </p>
        </div>
      </div>
    </div>
  );
}
