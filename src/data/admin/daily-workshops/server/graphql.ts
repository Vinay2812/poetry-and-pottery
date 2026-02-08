"use server";

import { getClient } from "@/lib/apollo";

import {
  ADMIN_CREATE_DAILY_WORKSHOP_CONFIG_MUTATION,
  ADMIN_DELETE_DAILY_WORKSHOP_BLACKOUT_RULE_MUTATION,
  ADMIN_DELETE_DAILY_WORKSHOP_CONFIG_MUTATION,
  ADMIN_DELETE_DAILY_WORKSHOP_PRICING_TIER_MUTATION,
  ADMIN_UPDATE_DAILY_WORKSHOP_CONFIG_MUTATION,
  ADMIN_UPSERT_DAILY_WORKSHOP_BLACKOUT_RULE_MUTATION,
  ADMIN_UPSERT_DAILY_WORKSHOP_PRICING_TIER_MUTATION,
} from "@/graphql/admin/daily-workshops.mutation";
import {
  ADMIN_DAILY_WORKSHOP_BLACKOUT_RULES_QUERY,
  ADMIN_DAILY_WORKSHOP_CONFIGS_QUERY,
  ADMIN_DAILY_WORKSHOP_CONFIG_QUERY,
  ADMIN_DAILY_WORKSHOP_PRICING_TIERS_QUERY,
} from "@/graphql/admin/daily-workshops.query";
import type {
  AdminDailyWorkshopBlackoutRule,
  AdminDailyWorkshopBlackoutRuleMutationResponse,
  AdminDailyWorkshopConfig,
  AdminDailyWorkshopConfigMutationResponse,
  AdminDailyWorkshopConfigQuery,
  AdminDailyWorkshopMutationResponse,
  AdminDailyWorkshopPricingTier,
  AdminDailyWorkshopPricingTierMutationResponse,
  AdminDeleteDailyWorkshopBlackoutRuleMutation,
  AdminDeleteDailyWorkshopBlackoutRuleMutationVariables,
  AdminDeleteDailyWorkshopPricingTierMutation,
  AdminDeleteDailyWorkshopPricingTierMutationVariables,
  AdminUpdateDailyWorkshopConfigInput,
  AdminUpsertDailyWorkshopBlackoutRuleInput,
  AdminUpsertDailyWorkshopPricingTierInput,
} from "@/graphql/generated/types";

type AdminDailyWorkshopConfigsQueryData = {
  adminDailyWorkshopConfigs: AdminDailyWorkshopConfig[];
};

type AdminDailyWorkshopPricingTiersQueryData = {
  adminDailyWorkshopPricingTiers: AdminDailyWorkshopPricingTier[];
};

type AdminDailyWorkshopPricingTiersQueryVariables = {
  configId?: number;
};

type AdminDailyWorkshopBlackoutRulesQueryData = {
  adminDailyWorkshopBlackoutRules: AdminDailyWorkshopBlackoutRule[];
};

type AdminDailyWorkshopBlackoutRulesQueryVariables = {
  configId?: number;
};

type AdminUpdateDailyWorkshopConfigMutationData = {
  adminUpdateDailyWorkshopConfig: AdminDailyWorkshopConfigMutationResponse;
};

type AdminUpdateDailyWorkshopConfigMutationVariables = {
  configId?: number;
  input: AdminUpdateDailyWorkshopConfigInput;
};

type AdminUpsertDailyWorkshopPricingTierMutationData = {
  adminUpsertDailyWorkshopPricingTier: AdminDailyWorkshopPricingTierMutationResponse;
};

type AdminUpsertDailyWorkshopPricingTierMutationVariables = {
  configId?: number;
  input: AdminUpsertDailyWorkshopPricingTierInput;
};

type AdminUpsertDailyWorkshopBlackoutRuleMutationData = {
  adminUpsertDailyWorkshopBlackoutRule: AdminDailyWorkshopBlackoutRuleMutationResponse;
};

type AdminUpsertDailyWorkshopBlackoutRuleMutationVariables = {
  configId?: number;
  input: AdminUpsertDailyWorkshopBlackoutRuleInput;
};

type AdminCreateDailyWorkshopConfigMutationData = {
  adminCreateDailyWorkshopConfig: AdminDailyWorkshopConfigMutationResponse;
};

type AdminDeleteDailyWorkshopConfigMutationData = {
  adminDeleteDailyWorkshopConfig: AdminDailyWorkshopMutationResponse;
};

type AdminDeleteDailyWorkshopConfigMutationVariables = {
  id: number;
};

export async function getDailyWorkshopConfig(): Promise<AdminDailyWorkshopConfig | null> {
  const client = getClient();

  const result = await client.query<AdminDailyWorkshopConfigQuery>({
    query: ADMIN_DAILY_WORKSHOP_CONFIG_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.adminDailyWorkshopConfig ?? null;
}

export async function getDailyWorkshopConfigs(): Promise<
  AdminDailyWorkshopConfig[]
> {
  const client = getClient();

  const result = await client.query<AdminDailyWorkshopConfigsQueryData>({
    query: ADMIN_DAILY_WORKSHOP_CONFIGS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.adminDailyWorkshopConfigs ?? [];
}

export async function getDailyWorkshopPricingTiers(
  configId?: number,
): Promise<AdminDailyWorkshopPricingTier[]> {
  const client = getClient();

  const result = await client.query<
    AdminDailyWorkshopPricingTiersQueryData,
    AdminDailyWorkshopPricingTiersQueryVariables
  >({
    query: ADMIN_DAILY_WORKSHOP_PRICING_TIERS_QUERY,
    variables: { configId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.adminDailyWorkshopPricingTiers ?? [];
}

export async function getDailyWorkshopBlackoutRules(
  configId?: number,
): Promise<AdminDailyWorkshopBlackoutRule[]> {
  const client = getClient();

  const result = await client.query<
    AdminDailyWorkshopBlackoutRulesQueryData,
    AdminDailyWorkshopBlackoutRulesQueryVariables
  >({
    query: ADMIN_DAILY_WORKSHOP_BLACKOUT_RULES_QUERY,
    variables: { configId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.adminDailyWorkshopBlackoutRules ?? [];
}

export async function updateDailyWorkshopConfig(
  input: AdminUpdateDailyWorkshopConfigInput,
  configId?: number,
): Promise<AdminDailyWorkshopConfigMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpdateDailyWorkshopConfigMutationData,
    AdminUpdateDailyWorkshopConfigMutationVariables
  >({
    mutation: ADMIN_UPDATE_DAILY_WORKSHOP_CONFIG_MUTATION,
    variables: { input, configId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpdateDailyWorkshopConfig;
}

export async function createDailyWorkshopConfig(): Promise<AdminDailyWorkshopConfigMutationResponse> {
  const client = getClient();

  const result =
    await client.mutate<AdminCreateDailyWorkshopConfigMutationData>({
      mutation: ADMIN_CREATE_DAILY_WORKSHOP_CONFIG_MUTATION,
    });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminCreateDailyWorkshopConfig;
}

export async function deleteDailyWorkshopConfig(
  id: number,
): Promise<AdminDailyWorkshopMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteDailyWorkshopConfigMutationData,
    AdminDeleteDailyWorkshopConfigMutationVariables
  >({
    mutation: ADMIN_DELETE_DAILY_WORKSHOP_CONFIG_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteDailyWorkshopConfig;
}

export async function upsertDailyWorkshopPricingTier(
  input: AdminUpsertDailyWorkshopPricingTierInput,
  configId?: number,
): Promise<AdminDailyWorkshopPricingTierMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpsertDailyWorkshopPricingTierMutationData,
    AdminUpsertDailyWorkshopPricingTierMutationVariables
  >({
    mutation: ADMIN_UPSERT_DAILY_WORKSHOP_PRICING_TIER_MUTATION,
    variables: { input, configId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpsertDailyWorkshopPricingTier;
}

export async function deleteDailyWorkshopPricingTier(
  id: number,
): Promise<AdminDailyWorkshopMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteDailyWorkshopPricingTierMutation,
    AdminDeleteDailyWorkshopPricingTierMutationVariables
  >({
    mutation: ADMIN_DELETE_DAILY_WORKSHOP_PRICING_TIER_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteDailyWorkshopPricingTier;
}

export async function upsertDailyWorkshopBlackoutRule(
  input: AdminUpsertDailyWorkshopBlackoutRuleInput,
  configId?: number,
): Promise<AdminDailyWorkshopBlackoutRuleMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminUpsertDailyWorkshopBlackoutRuleMutationData,
    AdminUpsertDailyWorkshopBlackoutRuleMutationVariables
  >({
    mutation: ADMIN_UPSERT_DAILY_WORKSHOP_BLACKOUT_RULE_MUTATION,
    variables: { input, configId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminUpsertDailyWorkshopBlackoutRule;
}

export async function deleteDailyWorkshopBlackoutRule(
  id: string,
): Promise<AdminDailyWorkshopMutationResponse> {
  const client = getClient();

  const result = await client.mutate<
    AdminDeleteDailyWorkshopBlackoutRuleMutation,
    AdminDeleteDailyWorkshopBlackoutRuleMutationVariables
  >({
    mutation: ADMIN_DELETE_DAILY_WORKSHOP_BLACKOUT_RULE_MUTATION,
    variables: { id },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data!.adminDeleteDailyWorkshopBlackoutRule;
}
