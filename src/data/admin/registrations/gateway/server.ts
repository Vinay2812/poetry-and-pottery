"use server";

import type {
  AdminRegistrationMutationResponse,
  UpdateRegistrationDetailsInput,
} from "@/graphql/generated/types";

import * as graphqlImpl from "../server/graphql";

export async function updateRegistrationStatus(
  registrationId: string,
  status: string,
): Promise<AdminRegistrationMutationResponse> {
  return graphqlImpl.updateRegistrationStatus(registrationId, status);
}

export async function updateRegistrationPrice(
  registrationId: string,
  price: number,
): Promise<AdminRegistrationMutationResponse> {
  return graphqlImpl.updateRegistrationPrice(registrationId, price);
}

export async function updateRegistrationDetails(
  registrationId: string,
  input: UpdateRegistrationDetailsInput,
): Promise<AdminRegistrationMutationResponse> {
  return graphqlImpl.updateRegistrationDetails(registrationId, input);
}
