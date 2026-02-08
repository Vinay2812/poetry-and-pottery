import { gql } from "@apollo/client";

const DAILY_WORKSHOP_PRICING_TIER_FIELDS = gql`
  fragment DailyWorkshopPricingTierFields on DailyWorkshopPricingTier {
    id
    config_id
    hours
    price_per_person
    pieces_per_person
    sort_order
    is_active
  }
`;

const DAILY_WORKSHOP_CONFIG_FIELDS = gql`
  fragment DailyWorkshopConfigFields on DailyWorkshopConfig {
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
    pricing_tiers {
      ...DailyWorkshopPricingTierFields
    }
  }
  ${DAILY_WORKSHOP_PRICING_TIER_FIELDS}
`;

const DAILY_WORKSHOP_REGISTRATION_SLOT_FIELDS = gql`
  fragment DailyWorkshopRegistrationSlotFields on DailyWorkshopRegistrationSlot {
    id
    registration_id
    slot_start_at
    slot_end_at
  }
`;

const DAILY_WORKSHOP_REGISTRATION_FIELDS = gql`
  fragment DailyWorkshopRegistrationFields on DailyWorkshopRegistration {
    id
    config_id
    user_id
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
    status
    request_at
    approved_at
    paid_at
    confirmed_at
    cancelled_at
    cancelled_reason
    cancelled_by_user_id
    cancelled_by_blackout_rule_id
    created_at
    updated_at
    slots {
      ...DailyWorkshopRegistrationSlotFields
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_SLOT_FIELDS}
`;

export const DAILY_WORKSHOP_PUBLIC_CONFIG_QUERY = gql`
  query DailyWorkshopPublicConfig {
    dailyWorkshopPublicConfig {
      ...DailyWorkshopConfigFields
    }
  }
  ${DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const DAILY_WORKSHOP_PUBLIC_CONFIGS_QUERY = gql`
  query DailyWorkshopPublicConfigs {
    dailyWorkshopPublicConfigs {
      ...DailyWorkshopConfigFields
    }
  }
  ${DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const DAILY_WORKSHOP_AVAILABILITY_QUERY = gql`
  query DailyWorkshopAvailability($filter: DailyWorkshopAvailabilityInput) {
    dailyWorkshopAvailability(filter: $filter) {
      config {
        ...DailyWorkshopConfigFields
      }
      days {
        date_key
        label
        slots {
          slot_start_at
          slot_end_at
          is_available
          reserved_participants
          remaining_capacity
          reason
        }
      }
    }
  }
  ${DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const MY_DAILY_WORKSHOP_REGISTRATIONS_QUERY = gql`
  query MyDailyWorkshopRegistrations(
    $filter: DailyWorkshopRegistrationsFilterInput
  ) {
    myDailyWorkshopRegistrations(filter: $filter) {
      data {
        ...DailyWorkshopRegistrationFields
      }
      total
      page
      total_pages
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_FIELDS}
`;

export const MY_UPCOMING_DAILY_WORKSHOP_REGISTRATIONS_QUERY = gql`
  query MyUpcomingDailyWorkshopRegistrations(
    $filter: DailyWorkshopRegistrationsFilterInput
  ) {
    myUpcomingDailyWorkshopRegistrations(filter: $filter) {
      data {
        ...DailyWorkshopRegistrationFields
      }
      total
      page
      total_pages
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_FIELDS}
`;

export const MY_COMPLETED_DAILY_WORKSHOP_REGISTRATIONS_QUERY = gql`
  query MyCompletedDailyWorkshopRegistrations(
    $filter: DailyWorkshopRegistrationsFilterInput
  ) {
    myCompletedDailyWorkshopRegistrations(filter: $filter) {
      data {
        ...DailyWorkshopRegistrationFields
      }
      total
      page
      total_pages
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_FIELDS}
`;

export const DAILY_WORKSHOP_REGISTRATION_BY_ID_QUERY = gql`
  query DailyWorkshopRegistrationById($registrationId: String!) {
    dailyWorkshopRegistrationById(registrationId: $registrationId) {
      ...DailyWorkshopRegistrationFields
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_FIELDS}
`;
