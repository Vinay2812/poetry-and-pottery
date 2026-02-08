import {
  getDailyWorkshopBlackoutRules,
  getDailyWorkshopConfigs,
  getDailyWorkshopPricingTiers,
} from "@/data/admin/daily-workshops/gateway/server";
import { DailyWorkshopsDashboardContainer } from "@/features/dashboard/daily-workshops";

export async function DailyWorkshopsDashboardContent() {
  const configs = await getDailyWorkshopConfigs();
  const initialConfig = configs[0] ?? null;

  const [pricingTiers, blackoutRules] = await Promise.all([
    getDailyWorkshopPricingTiers(initialConfig?.id),
    getDailyWorkshopBlackoutRules(initialConfig?.id),
  ]);

  return (
    <DailyWorkshopsDashboardContainer
      configs={configs}
      initialConfigId={initialConfig?.id ?? null}
      pricingTiers={pricingTiers}
      blackoutRules={blackoutRules}
    />
  );
}
