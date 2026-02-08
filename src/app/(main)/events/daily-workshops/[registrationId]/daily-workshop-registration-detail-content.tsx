import {
  getDailyWorkshopPublicConfigs,
  getDailyWorkshopRegistrationById,
} from "@/data/daily-workshops/gateway/server";
import { DailyWorkshopRegistrationDetailContainer } from "@/features/daily-workshops";
import { notFound } from "next/navigation";

export interface DailyWorkshopRegistrationDetailPageParams {
  registrationId: string;
}

interface DailyWorkshopRegistrationDetailContentProps {
  params: Promise<DailyWorkshopRegistrationDetailPageParams>;
}

export async function DailyWorkshopRegistrationDetailContent({
  params,
}: DailyWorkshopRegistrationDetailContentProps) {
  const { registrationId } = await params;
  const [registrationResult, configsResult] = await Promise.all([
    getDailyWorkshopRegistrationById(registrationId),
    getDailyWorkshopPublicConfigs(),
  ]);

  if (!registrationResult.success) {
    notFound();
  }

  const config = configsResult.success
    ? (configsResult.data.find(
        (item) => item.id === registrationResult.data.config_id,
      ) ?? null)
    : null;

  return (
    <DailyWorkshopRegistrationDetailContainer
      registration={registrationResult.data}
      config={config}
    />
  );
}
