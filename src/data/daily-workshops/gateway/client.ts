"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useCallback } from "react";

import {
  REGISTER_FOR_DAILY_WORKSHOP_MUTATION,
  RESCHEDULE_DAILY_WORKSHOP_REGISTRATION_MUTATION,
} from "@/graphql/daily-workshops.mutation";
import { DAILY_WORKSHOP_AVAILABILITY_QUERY } from "@/graphql/daily-workshops.query";
import type {
  DailyWorkshopAvailabilityResponse,
  DailyWorkshopRegistration,
} from "@/graphql/generated/graphql";
import { useDailyWorkshopPublicConfigQuery } from "@/graphql/generated/graphql";

export { useDailyWorkshopPublicConfigQuery };

export type RegisterForDailyWorkshopResult =
  | { success: true; data: DailyWorkshopRegistration }
  | { success: false; error: string };

export type RescheduleDailyWorkshopResult =
  | { success: true; data: DailyWorkshopRegistration }
  | { success: false; error: string };

interface UseRegisterForDailyWorkshopReturn {
  mutate: (
    input: {
      configId?: number;
      participants?: number;
      slotStartTimes: string[];
      discount?: number;
    },
  ) => Promise<RegisterForDailyWorkshopResult>;
  loading: boolean;
  error: Error | undefined;
}

interface DailyWorkshopAvailabilityFilterInput {
  start_date?: string;
  days?: number;
  config_id?: number;
}

interface DailyWorkshopAvailabilityQueryData {
  dailyWorkshopAvailability?: DailyWorkshopAvailabilityResponse | null;
}

interface UseDailyWorkshopAvailabilityByConfigQueryOptions {
  configId?: number;
  days?: number;
  skip?: boolean;
}

interface UseRescheduleDailyWorkshopRegistrationReturn {
  mutate: (input: {
    registrationId: string;
    slotStartTimes: string[];
  }) => Promise<RescheduleDailyWorkshopResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useDailyWorkshopAvailabilityByConfigQuery({
  configId,
  days,
  skip = false,
}: UseDailyWorkshopAvailabilityByConfigQueryOptions) {
  return useQuery<
    DailyWorkshopAvailabilityQueryData,
    { filter?: DailyWorkshopAvailabilityFilterInput }
  >(DAILY_WORKSHOP_AVAILABILITY_QUERY, {
    variables: {
      filter: {
        ...(typeof days === "number" ? { days } : {}),
        ...(configId ? { config_id: configId } : {}),
      },
    },
    skip,
  });
}

export function useRegisterForDailyWorkshop(): UseRegisterForDailyWorkshopReturn {
  const [graphqlMutate, { loading, error }] = useMutation<{
    registerForDailyWorkshop?: {
      success: boolean;
      error?: string | null;
      registration?: DailyWorkshopRegistration | null;
    } | null;
  }>(REGISTER_FOR_DAILY_WORKSHOP_MUTATION);

  const mutate = useCallback(
    async (input: {
      configId?: number;
      participants?: number;
      slotStartTimes: string[];
      discount?: number;
    }): Promise<RegisterForDailyWorkshopResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: {
            input: {
              ...(input.configId ? { config_id: input.configId } : {}),
              participants: input.participants ?? 1,
              slot_start_times: input.slotStartTimes,
              discount: input.discount ?? 0,
            },
          },
        });
        const registerResponse = data?.registerForDailyWorkshop;

        if (registerResponse?.success && registerResponse.registration) {
          return {
            success: true,
            data: registerResponse.registration,
          };
        }

        return {
          success: false,
          error: registerResponse?.error ?? "Failed to register for daily workshop",
        };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}

export function useRescheduleDailyWorkshopRegistration(): UseRescheduleDailyWorkshopRegistrationReturn {
  const [graphqlMutate, { loading, error }] = useMutation<{
    rescheduleDailyWorkshopRegistration?: {
      success: boolean;
      error?: string | null;
      registration?: DailyWorkshopRegistration | null;
    } | null;
  }>(RESCHEDULE_DAILY_WORKSHOP_REGISTRATION_MUTATION);

  const mutate = useCallback(
    async (input: {
      registrationId: string;
      slotStartTimes: string[];
    }): Promise<RescheduleDailyWorkshopResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: {
            input: {
              registration_id: input.registrationId,
              slot_start_times: input.slotStartTimes,
            },
          },
        });

        if (
          data?.rescheduleDailyWorkshopRegistration?.success &&
          data.rescheduleDailyWorkshopRegistration.registration
        ) {
          return {
            success: true,
            data: data.rescheduleDailyWorkshopRegistration.registration,
          };
        }

        return {
          success: false,
          error:
            data?.rescheduleDailyWorkshopRegistration?.error ??
            "Failed to reschedule booking",
        };
      } catch (e) {
        return {
          success: false,
          error: e instanceof Error ? e.message : "Unknown error",
        };
      }
    },
    [graphqlMutate],
  );

  return { mutate, loading, error };
}
