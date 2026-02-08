import { gql } from "@apollo/client";

const DAILY_WORKSHOP_REGISTRATION_MUTATION_FIELDS = gql`
  fragment DailyWorkshopRegistrationMutationFields on DailyWorkshopRegistration {
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
      id
      registration_id
      slot_start_at
      slot_end_at
    }
  }
`;

export const REGISTER_FOR_DAILY_WORKSHOP_MUTATION = gql`
  mutation RegisterForDailyWorkshop(
    $input: CreateDailyWorkshopRegistrationInput!
  ) {
    registerForDailyWorkshop(input: $input) {
      success
      error
      registration {
        ...DailyWorkshopRegistrationMutationFields
      }
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_MUTATION_FIELDS}
`;

export const RESCHEDULE_DAILY_WORKSHOP_REGISTRATION_MUTATION = gql`
  mutation RescheduleDailyWorkshopRegistration(
    $input: RescheduleDailyWorkshopRegistrationInput!
  ) {
    rescheduleDailyWorkshopRegistration(input: $input) {
      success
      error
      registration {
        ...DailyWorkshopRegistrationMutationFields
      }
    }
  }
  ${DAILY_WORKSHOP_REGISTRATION_MUTATION_FIELDS}
`;
