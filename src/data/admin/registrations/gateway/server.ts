"use server";

import { isGraphQL } from "@/consts/env";

import type {
  AdminRegistrationMutationResponse,
  UpdateRegistrationDetailsInput,
} from "@/graphql/generated/types";

import * as actionImpl from "../server/action";
import * as graphqlImpl from "../server/graphql";

export async function updateRegistrationStatus(
  registrationId: string,
  status: string,
): Promise<AdminRegistrationMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateRegistrationStatus(registrationId, status);
  }
  return actionImpl.updateRegistrationStatus(registrationId, status);
}

export async function updateRegistrationPrice(
  registrationId: string,
  price: number,
): Promise<AdminRegistrationMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateRegistrationPrice(registrationId, price);
  }
  return actionImpl.updateRegistrationPrice(registrationId, price);
}

export async function updateRegistrationDetails(
  registrationId: string,
  input: UpdateRegistrationDetailsInput,
): Promise<AdminRegistrationMutationResponse> {
  if (isGraphQL) {
    return graphqlImpl.updateRegistrationDetails(registrationId, input);
  }
  return actionImpl.updateRegistrationDetails(registrationId, input);
}
