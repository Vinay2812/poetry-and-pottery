const SHIPPING_RATES = [
  {
    method: "Standard Shipping",
    delivery: "5-7 business days",
    price: "\u20B999",
  },
  {
    method: "Express Shipping",
    delivery: "2-3 business days",
    price: "\u20B9199",
  },
];

export function ShippingRatesSection() {
  return (
    <section className="mb-10">
      <h2 className="font-display mb-4 text-xl font-semibold text-neutral-900">
        Shipping Rates
      </h2>
      <div className="shadow-soft overflow-hidden rounded-2xl bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-5 py-3 text-left text-sm font-medium text-neutral-900">
                Method
              </th>
              <th className="px-5 py-3 text-left text-sm font-medium text-neutral-900">
                Delivery Time
              </th>
              <th className="px-5 py-3 text-right text-sm font-medium text-neutral-900">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {SHIPPING_RATES.map((rate) => (
              <tr key={rate.method}>
                <td className="px-5 py-4 text-sm font-medium text-neutral-900">
                  {rate.method}
                </td>
                <td className="text-muted-foreground px-5 py-4 text-sm">
                  {rate.delivery}
                </td>
                <td className="text-primary px-5 py-4 text-right text-sm font-medium">
                  {rate.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
