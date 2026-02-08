"use server";

import { getClient, getPublicClient } from "@/lib/apollo";

import { REGISTER_FOR_DAILY_WORKSHOP_MUTATION } from "@/graphql/daily-workshops.mutation";
import {
  DAILY_WORKSHOP_AVAILABILITY_QUERY,
  DAILY_WORKSHOP_PUBLIC_CONFIGS_QUERY,
  DAILY_WORKSHOP_PUBLIC_CONFIG_QUERY,
  DAILY_WORKSHOP_REGISTRATION_BY_ID_QUERY,
  MY_COMPLETED_DAILY_WORKSHOP_REGISTRATIONS_QUERY,
  MY_DAILY_WORKSHOP_REGISTRATIONS_QUERY,
  MY_UPCOMING_DAILY_WORKSHOP_REGISTRATIONS_QUERY,
} from "@/graphql/daily-workshops.query";
import type {
  CreateDailyWorkshopRegistrationInput,
  CreateDailyWorkshopRegistrationResponse,
  DailyWorkshopAvailabilityInput,
  DailyWorkshopAvailabilityQuery,
  DailyWorkshopAvailabilityQueryVariables,
  DailyWorkshopAvailabilityResponse,
  DailyWorkshopConfig,
  DailyWorkshopPublicConfigQuery,
  DailyWorkshopRegistration,
  DailyWorkshopRegistrationByIdQuery,
  DailyWorkshopRegistrationByIdQueryVariables,
  DailyWorkshopRegistrationsFilterInput,
  DailyWorkshopRegistrationsResponse,
  MyCompletedDailyWorkshopRegistrationsQuery,
  MyCompletedDailyWorkshopRegistrationsQueryVariables,
  MyDailyWorkshopRegistrationsQuery,
  MyDailyWorkshopRegistrationsQueryVariables,
  MyUpcomingDailyWorkshopRegistrationsQuery,
  MyUpcomingDailyWorkshopRegistrationsQueryVariables,
  RegisterForDailyWorkshopMutation,
  RegisterForDailyWorkshopMutationVariables,
} from "@/graphql/generated/types";

type DailyWorkshopAvailabilityFilter = DailyWorkshopAvailabilityInput & {
  config_id?: number;
};

type DailyWorkshopPublicConfigsQuery = {
  dailyWorkshopPublicConfigs: DailyWorkshopConfig[];
};

export async function getDailyWorkshopPublicConfig() {
  const client = getPublicClient();

  const result = await client.query<DailyWorkshopPublicConfigQuery>({
    query: DAILY_WORKSHOP_PUBLIC_CONFIG_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.dailyWorkshopPublicConfig ?? null;
}

export async function getDailyWorkshopAvailability(
  filter?: DailyWorkshopAvailabilityFilter,
): Promise<DailyWorkshopAvailabilityResponse | null> {
  const client = getPublicClient();

  const result = await client.query<
    DailyWorkshopAvailabilityQuery,
    DailyWorkshopAvailabilityQueryVariables
  >({
    query: DAILY_WORKSHOP_AVAILABILITY_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.dailyWorkshopAvailability ?? null;
}

export async function getDailyWorkshopPublicConfigs(): Promise<
  DailyWorkshopConfig[]
> {
  const client = getPublicClient();

  const result = await client.query<DailyWorkshopPublicConfigsQuery>({
    query: DAILY_WORKSHOP_PUBLIC_CONFIGS_QUERY,
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.dailyWorkshopPublicConfigs ?? [];
}

export async function getMyDailyWorkshopRegistrations(
  filter?: DailyWorkshopRegistrationsFilterInput,
): Promise<DailyWorkshopRegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    MyDailyWorkshopRegistrationsQuery,
    MyDailyWorkshopRegistrationsQueryVariables
  >({
    query: MY_DAILY_WORKSHOP_REGISTRATIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.myDailyWorkshopRegistrations ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getMyUpcomingDailyWorkshopRegistrations(
  filter?: DailyWorkshopRegistrationsFilterInput,
): Promise<DailyWorkshopRegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    MyUpcomingDailyWorkshopRegistrationsQuery,
    MyUpcomingDailyWorkshopRegistrationsQueryVariables
  >({
    query: MY_UPCOMING_DAILY_WORKSHOP_REGISTRATIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.myUpcomingDailyWorkshopRegistrations ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getMyCompletedDailyWorkshopRegistrations(
  filter?: DailyWorkshopRegistrationsFilterInput,
): Promise<DailyWorkshopRegistrationsResponse> {
  const client = getClient();

  const result = await client.query<
    MyCompletedDailyWorkshopRegistrationsQuery,
    MyCompletedDailyWorkshopRegistrationsQueryVariables
  >({
    query: MY_COMPLETED_DAILY_WORKSHOP_REGISTRATIONS_QUERY,
    variables: { filter },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.myCompletedDailyWorkshopRegistrations ?? {
      data: [],
      total: 0,
      page: 1,
      total_pages: 0,
    }
  );
}

export async function getDailyWorkshopRegistrationById(
  registrationId: string,
): Promise<DailyWorkshopRegistration | null> {
  const client = getClient();

  const result = await client.query<
    DailyWorkshopRegistrationByIdQuery,
    DailyWorkshopRegistrationByIdQueryVariables
  >({
    query: DAILY_WORKSHOP_REGISTRATION_BY_ID_QUERY,
    variables: { registrationId },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.dailyWorkshopRegistrationById ?? null;
}

export async function registerForDailyWorkshop(
  input: CreateDailyWorkshopRegistrationInput,
): Promise<CreateDailyWorkshopRegistrationResponse> {
  const client = getClient();

  const result = await client.mutate<
    RegisterForDailyWorkshopMutation,
    RegisterForDailyWorkshopMutationVariables
  >({
    mutation: REGISTER_FOR_DAILY_WORKSHOP_MUTATION,
    variables: { input },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return (
    result.data?.registerForDailyWorkshop ?? {
      success: false,
      registration: null,
      error: "Failed to register for daily workshop",
    }
  );
}
