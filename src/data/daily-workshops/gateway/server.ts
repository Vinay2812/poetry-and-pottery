"use server";

import { cacheLife, cacheTag } from "next/cache";

import type {
  CreateDailyWorkshopRegistrationInput,
  CreateDailyWorkshopRegistrationResponse,
  DailyWorkshopAvailabilityInput,
  DailyWorkshopAvailabilityResponse,
  DailyWorkshopConfig,
  DailyWorkshopRegistration,
  DailyWorkshopRegistrationsFilterInput,
  DailyWorkshopRegistrationsResponse,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export type GetDailyWorkshopConfigResult =
  | { success: true; data: DailyWorkshopConfig }
  | { success: false; error: string };

export type GetDailyWorkshopAvailabilityResult =
  | { success: true; data: DailyWorkshopAvailabilityResponse }
  | { success: false; error: string };

export type GetDailyWorkshopConfigsResult =
  | { success: true; data: DailyWorkshopConfig[] }
  | { success: false; error: string };

export type GetDailyWorkshopRegistrationsResult =
  | { success: true; data: DailyWorkshopRegistrationsResponse }
  | { success: false; error: string };

export type GetDailyWorkshopRegistrationResult =
  | { success: true; data: DailyWorkshopRegistration }
  | { success: false; error: string };

export type RegisterForDailyWorkshopResult =
  | { success: true; data: CreateDailyWorkshopRegistrationResponse }
  | { success: false; error: string };

export async function getDailyWorkshopPublicConfig(): Promise<GetDailyWorkshopConfigResult> {
  "use cache";
  cacheTag("daily-workshops", "daily-workshops:config");
  cacheLife("events");

  try {
    const result = await graphqlImpl.getDailyWorkshopPublicConfig();
    if (!result) {
      return {
        success: false,
        error: "Daily workshop config not found",
      };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch daily workshop config",
    };
  }
}

export async function getDailyWorkshopAvailability(
  filter?: DailyWorkshopAvailabilityInput & { config_id?: number },
): Promise<GetDailyWorkshopAvailabilityResult> {
  "use cache";
  cacheTag("daily-workshops", "daily-workshops:availability");
  cacheLife("events");

  try {
    const result = await graphqlImpl.getDailyWorkshopAvailability(filter);
    if (!result) {
      return {
        success: false,
        error: "Daily workshop availability unavailable",
      };
    }
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch daily workshop availability",
    };
  }
}

export async function getDailyWorkshopPublicConfigs(): Promise<GetDailyWorkshopConfigsResult> {
  "use cache";
  cacheTag("daily-workshops", "daily-workshops:configs");
  cacheLife("events");

  try {
    const result = await graphqlImpl.getDailyWorkshopPublicConfigs();
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch daily workshop configs",
    };
  }
}

export async function getMyDailyWorkshopRegistrations(
  filter?: DailyWorkshopRegistrationsFilterInput,
): Promise<GetDailyWorkshopRegistrationsResult> {
  try {
    const result = await graphqlImpl.getMyDailyWorkshopRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch daily workshop registrations",
    };
  }
}

export async function getMyUpcomingDailyWorkshopRegistrations(
  filter?: DailyWorkshopRegistrationsFilterInput,
): Promise<GetDailyWorkshopRegistrationsResult> {
  try {
    const result =
      await graphqlImpl.getMyUpcomingDailyWorkshopRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch upcoming daily workshop registrations",
    };
  }
}

export async function getMyCompletedDailyWorkshopRegistrations(
  filter?: DailyWorkshopRegistrationsFilterInput,
): Promise<GetDailyWorkshopRegistrationsResult> {
  try {
    const result =
      await graphqlImpl.getMyCompletedDailyWorkshopRegistrations(filter);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch completed daily workshop registrations",
    };
  }
}

export async function getDailyWorkshopRegistrationById(
  registrationId: string,
): Promise<GetDailyWorkshopRegistrationResult> {
  try {
    const result =
      await graphqlImpl.getDailyWorkshopRegistrationById(registrationId);

    if (!result) {
      return {
        success: false,
        error: "Daily workshop registration not found",
      };
    }

    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch daily workshop registration",
    };
  }
}

export async function registerForDailyWorkshop(
  input: CreateDailyWorkshopRegistrationInput,
): Promise<RegisterForDailyWorkshopResult> {
  try {
    const result = await graphqlImpl.registerForDailyWorkshop(input);
    if (!result.success) {
      return {
        success: false,
        error: result.error ?? "Failed to register for daily workshop",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to register for daily workshop",
    };
  }
}
