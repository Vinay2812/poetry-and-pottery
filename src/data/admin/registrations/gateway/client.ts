"use client";

import { isGraphQL } from "@/consts/env";
import { useCallback, useState } from "react";

import {
  useAdminUpdateRegistrationDetailsMutation,
  useAdminUpdateRegistrationPriceMutation,
  useAdminUpdateRegistrationStatusMutation,
} from "@/graphql/generated/graphql";
import type {
  AdminRegistrationMutationResponse,
  UpdateRegistrationDetailsInput,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";

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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateRegistrationStatusMutation();

  const mutate = useCallback(
    async (
      registrationId: string,
      status: string,
    ): Promise<UpdateRegistrationStatusResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateRegistrationStatus(
            registrationId,
            status,
          );
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update registration status",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateRegistrationPriceMutation();

  const mutate = useCallback(
    async (
      registrationId: string,
      price: number,
    ): Promise<UpdateRegistrationPriceResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateRegistrationPrice(
            registrationId,
            price,
          );
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update registration price",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
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
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<Error | undefined>();

  const [graphqlMutate, { loading: graphqlLoading, error: graphqlError }] =
    useAdminUpdateRegistrationDetailsMutation();

  const mutate = useCallback(
    async (
      registrationId: string,
      input: UpdateRegistrationDetailsInput,
    ): Promise<UpdateRegistrationDetailsResult> => {
      if (isGraphQL) {
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
      } else {
        setActionLoading(true);
        setActionError(undefined);
        try {
          const result = await actionImpl.updateRegistrationDetails(
            registrationId,
            input,
          );
          if (result.success) {
            return { success: true, data: result };
          }
          return {
            success: false,
            error: result.error ?? "Failed to update registration details",
          };
        } catch (e) {
          const error = e instanceof Error ? e : new Error("Unknown error");
          setActionError(error);
          return { success: false, error: error.message };
        } finally {
          setActionLoading(false);
        }
      }
    },
    [graphqlMutate],
  );

  return {
    mutate,
    loading: isGraphQL ? graphqlLoading : actionLoading,
    error: isGraphQL ? graphqlError : actionError,
  };
}
