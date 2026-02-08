import { gql } from "@apollo/client";

const ADMIN_DAILY_WORKSHOP_CONFIG_FIELDS = gql`
  fragment AdminDailyWorkshopConfigMutationFields on AdminDailyWorkshopConfig {
    id
    key
    name
    description
    is_active
    timezone
    opening_hour
    closing_hour
    slot_duration_minutes
    slot_capacity
    booking_window_days
    auto_cancel_on_blackout
    created_at
    updated_at
  }
`;

const ADMIN_DAILY_WORKSHOP_PRICING_TIER_FIELDS = gql`
  fragment AdminDailyWorkshopPricingTierMutationFields on AdminDailyWorkshopPricingTier {
    id
    config_id
    hours
    price_per_person
    pieces_per_person
    sort_order
    is_active
    created_at
    updated_at
  }
`;

const ADMIN_DAILY_WORKSHOP_BLACKOUT_RULE_FIELDS = gql`
  fragment AdminDailyWorkshopBlackoutRuleMutationFields on AdminDailyWorkshopBlackoutRule {
    id
    config_id
    name
    type
    is_active
    timezone
    reason
    auto_cancel_existing
    one_time_start_at
    one_time_end_at
    recurrence_start_date
    recurrence_end_date
    weekdays
    month_days
    range_start_minutes
    range_end_minutes
    created_by_user_id
    created_at
    updated_at
  }
`;

export const ADMIN_UPDATE_DAILY_WORKSHOP_CONFIG_MUTATION = gql`
  mutation AdminUpdateDailyWorkshopConfig(
    $configId: Int
    $input: AdminUpdateDailyWorkshopConfigInput!
  ) {
    adminUpdateDailyWorkshopConfig(configId: $configId, input: $input) {
      success
      error
      config {
        ...AdminDailyWorkshopConfigMutationFields
      }
    }
  }
  ${ADMIN_DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const ADMIN_UPSERT_DAILY_WORKSHOP_PRICING_TIER_MUTATION = gql`
  mutation AdminUpsertDailyWorkshopPricingTier(
    $configId: Int
    $input: AdminUpsertDailyWorkshopPricingTierInput!
  ) {
    adminUpsertDailyWorkshopPricingTier(configId: $configId, input: $input) {
      success
      error
      tier {
        ...AdminDailyWorkshopPricingTierMutationFields
      }
    }
  }
  ${ADMIN_DAILY_WORKSHOP_PRICING_TIER_FIELDS}
`;

export const ADMIN_DELETE_DAILY_WORKSHOP_PRICING_TIER_MUTATION = gql`
  mutation AdminDeleteDailyWorkshopPricingTier($id: Int!) {
    adminDeleteDailyWorkshopPricingTier(id: $id) {
      success
      error
    }
  }
`;

export const ADMIN_UPSERT_DAILY_WORKSHOP_BLACKOUT_RULE_MUTATION = gql`
  mutation AdminUpsertDailyWorkshopBlackoutRule(
    $configId: Int
    $input: AdminUpsertDailyWorkshopBlackoutRuleInput!
  ) {
    adminUpsertDailyWorkshopBlackoutRule(configId: $configId, input: $input) {
      success
      error
      rule {
        ...AdminDailyWorkshopBlackoutRuleMutationFields
      }
    }
  }
  ${ADMIN_DAILY_WORKSHOP_BLACKOUT_RULE_FIELDS}
`;

export const ADMIN_DELETE_DAILY_WORKSHOP_BLACKOUT_RULE_MUTATION = gql`
  mutation AdminDeleteDailyWorkshopBlackoutRule($id: String!) {
    adminDeleteDailyWorkshopBlackoutRule(id: $id) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_DAILY_WORKSHOP_REGISTRATION_STATUS_MUTATION = gql`
  mutation AdminUpdateDailyWorkshopRegistrationStatus(
    $registrationId: String!
    $status: String!
  ) {
    adminUpdateDailyWorkshopRegistrationStatus(
      registrationId: $registrationId
      status: $status
    ) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_DAILY_WORKSHOP_REGISTRATION_DETAILS_MUTATION = gql`
  mutation AdminUpdateDailyWorkshopRegistrationDetails(
    $registrationId: String!
    $input: AdminUpdateDailyWorkshopRegistrationInput!
  ) {
    adminUpdateDailyWorkshopRegistrationDetails(
      registrationId: $registrationId
      input: $input
    ) {
      success
      error
      registration {
        id
        status
        participants
        total_hours
        slots_count
        price_per_person
        pieces_per_person
        base_amount
        discount
        final_amount
        total_pieces
        currency
        pricing_snapshot
        created_at
        updated_at
        request_at
        approved_at
        paid_at
        confirmed_at
        cancelled_at
        cancelled_reason
        slots {
          id
          slot_start_at
          slot_end_at
        }
      }
    }
  }
`;

export const ADMIN_CREATE_DAILY_WORKSHOP_CONFIG_MUTATION = gql`
  mutation AdminCreateDailyWorkshopConfig {
    adminCreateDailyWorkshopConfig {
      success
      error
      config {
        ...AdminDailyWorkshopConfigMutationFields
      }
    }
  }
  ${ADMIN_DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const ADMIN_DELETE_DAILY_WORKSHOP_CONFIG_MUTATION = gql`
  mutation AdminDeleteDailyWorkshopConfig($id: Int!) {
    adminDeleteDailyWorkshopConfig(id: $id) {
      success
      error
    }
  }
`;
