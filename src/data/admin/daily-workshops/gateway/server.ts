"use server";

import type {
  AdminDailyWorkshopBlackoutRule,
  AdminDailyWorkshopBlackoutRuleMutationResponse,
  AdminDailyWorkshopConfig,
  AdminDailyWorkshopConfigMutationResponse,
  AdminDailyWorkshopMutationResponse,
  AdminDailyWorkshopPricingTier,
  AdminDailyWorkshopPricingTierMutationResponse,
  AdminDailyWorkshopRegistration,
  AdminUpdateDailyWorkshopConfigInput,
  AdminUpsertDailyWorkshopBlackoutRuleInput,
  AdminUpsertDailyWorkshopPricingTierInput,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function getDailyWorkshopConfig(): Promise<AdminDailyWorkshopConfig | null> {
  return graphqlImpl.getDailyWorkshopConfig();
}

export async function getDailyWorkshopConfigs(): Promise<
  AdminDailyWorkshopConfig[]
> {
  return graphqlImpl.getDailyWorkshopConfigs();
}

export async function getDailyWorkshopPricingTiers(
  configId?: number,
): Promise<AdminDailyWorkshopPricingTier[]> {
  return graphqlImpl.getDailyWorkshopPricingTiers(configId);
}

export async function getDailyWorkshopBlackoutRules(
  configId?: number,
): Promise<AdminDailyWorkshopBlackoutRule[]> {
  return graphqlImpl.getDailyWorkshopBlackoutRules(configId);
}

export async function getUserDailyWorkshopRegistrations(
  userId: number,
): Promise<AdminDailyWorkshopRegistration[]> {
  return graphqlImpl.getUserDailyWorkshopRegistrations(userId);
}

export async function updateDailyWorkshopConfig(
  input: AdminUpdateDailyWorkshopConfigInput,
  configId?: number,
): Promise<AdminDailyWorkshopConfigMutationResponse> {
  return graphqlImpl.updateDailyWorkshopConfig(input, configId);
}

export async function createDailyWorkshopConfig(): Promise<AdminDailyWorkshopConfigMutationResponse> {
  return graphqlImpl.createDailyWorkshopConfig();
}

export async function deleteDailyWorkshopConfig(
  id: number,
): Promise<AdminDailyWorkshopMutationResponse> {
  return graphqlImpl.deleteDailyWorkshopConfig(id);
}

export async function upsertDailyWorkshopPricingTier(
  input: AdminUpsertDailyWorkshopPricingTierInput,
  configId?: number,
): Promise<AdminDailyWorkshopPricingTierMutationResponse> {
  return graphqlImpl.upsertDailyWorkshopPricingTier(input, configId);
}

export async function deleteDailyWorkshopPricingTier(
  id: number,
): Promise<AdminDailyWorkshopMutationResponse> {
  return graphqlImpl.deleteDailyWorkshopPricingTier(id);
}

export async function upsertDailyWorkshopBlackoutRule(
  input: AdminUpsertDailyWorkshopBlackoutRuleInput,
  configId?: number,
): Promise<AdminDailyWorkshopBlackoutRuleMutationResponse> {
  return graphqlImpl.upsertDailyWorkshopBlackoutRule(input, configId);
}

export async function deleteDailyWorkshopBlackoutRule(
  id: string,
): Promise<AdminDailyWorkshopMutationResponse> {
  return graphqlImpl.deleteDailyWorkshopBlackoutRule(id);
}

export async function updateDailyWorkshopRegistrationStatus(
  registrationId: string,
  status: string,
): Promise<AdminDailyWorkshopMutationResponse> {
  return graphqlImpl.updateDailyWorkshopRegistrationStatus(
    registrationId,
    status,
  );
}
