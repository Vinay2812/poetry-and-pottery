"use client";

import { useCallback } from "react";

import {
  useAdminUpdateRegistrationDetailsMutation,
  useAdminUpdateRegistrationPriceMutation,
  useAdminUpdateRegistrationStatusMutation,
} from "@/graphql/generated/graphql";
import type {
  AdminRegistrationMutationResponse,
  UpdateRegistrationDetailsInput,
} from "@/graphql/generated/types";

// ============ UPDATE REGISTRATION STATUS ============

type UpdateRegistrationStatusResult =
  | { success: true; data: AdminRegistrationMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateRegistrationStatusReturn {
  mutate: (
    registrationId: string,
    status: string,
  ) => Promise<UpdateRegistrationStatusResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateRegistrationStatus(): UseAdminUpdateRegistrationStatusReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateRegistrationStatusMutation();

  const mutate = useCallback(
    async (
      registrationId: string,
      status: string,
    ): Promise<UpdateRegistrationStatusResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { registrationId, status },
        });
        if (data?.adminUpdateRegistrationStatus) {
          return { success: true, data: data.adminUpdateRegistrationStatus };
        }
        return {
          success: false,
          error: "Failed to update registration status",
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

// ============ UPDATE REGISTRATION PRICE ============

type UpdateRegistrationPriceResult =
  | { success: true; data: AdminRegistrationMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateRegistrationPriceReturn {
  mutate: (
    registrationId: string,
    price: number,
  ) => Promise<UpdateRegistrationPriceResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateRegistrationPrice(): UseAdminUpdateRegistrationPriceReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateRegistrationPriceMutation();

  const mutate = useCallback(
    async (
      registrationId: string,
      price: number,
    ): Promise<UpdateRegistrationPriceResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { registrationId, price },
        });
        if (data?.adminUpdateRegistrationPrice) {
          return { success: true, data: data.adminUpdateRegistrationPrice };
        }
        return {
          success: false,
          error: "Failed to update registration price",
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

// ============ UPDATE REGISTRATION DETAILS ============

type UpdateRegistrationDetailsResult =
  | { success: true; data: AdminRegistrationMutationResponse }
  | { success: false; error: string };

interface UseAdminUpdateRegistrationDetailsReturn {
  mutate: (
    registrationId: string,
    input: UpdateRegistrationDetailsInput,
  ) => Promise<UpdateRegistrationDetailsResult>;
  loading: boolean;
  error: Error | undefined;
}

export function useAdminUpdateRegistrationDetails(): UseAdminUpdateRegistrationDetailsReturn {
  const [graphqlMutate, { loading, error }] =
    useAdminUpdateRegistrationDetailsMutation();

  const mutate = useCallback(
    async (
      registrationId: string,
      input: UpdateRegistrationDetailsInput,
    ): Promise<UpdateRegistrationDetailsResult> => {
      try {
        const { data } = await graphqlMutate({
          variables: { registrationId, input },
        });
        if (data?.adminUpdateRegistrationDetails) {
          return { success: true, data: data.adminUpdateRegistrationDetails };
        }
        return {
          success: false,
          error: "Failed to update registration details",
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
