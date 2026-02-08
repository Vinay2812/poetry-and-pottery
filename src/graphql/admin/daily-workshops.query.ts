import { gql } from "@apollo/client";

const ADMIN_DAILY_WORKSHOP_CONFIG_FIELDS = gql`
  fragment AdminDailyWorkshopConfigFields on AdminDailyWorkshopConfig {
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
  fragment AdminDailyWorkshopPricingTierFields on AdminDailyWorkshopPricingTier {
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
  fragment AdminDailyWorkshopBlackoutRuleFields on AdminDailyWorkshopBlackoutRule {
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

export const ADMIN_DAILY_WORKSHOP_CONFIG_QUERY = gql`
  query AdminDailyWorkshopConfig {
    adminDailyWorkshopConfig {
      ...AdminDailyWorkshopConfigFields
    }
  }
  ${ADMIN_DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const ADMIN_DAILY_WORKSHOP_CONFIGS_QUERY = gql`
  query AdminDailyWorkshopConfigs {
    adminDailyWorkshopConfigs {
      ...AdminDailyWorkshopConfigFields
    }
  }
  ${ADMIN_DAILY_WORKSHOP_CONFIG_FIELDS}
`;

export const ADMIN_DAILY_WORKSHOP_PRICING_TIERS_QUERY = gql`
  query AdminDailyWorkshopPricingTiers($configId: Int) {
    adminDailyWorkshopPricingTiers(configId: $configId) {
      ...AdminDailyWorkshopPricingTierFields
    }
  }
  ${ADMIN_DAILY_WORKSHOP_PRICING_TIER_FIELDS}
`;

export const ADMIN_DAILY_WORKSHOP_BLACKOUT_RULES_QUERY = gql`
  query AdminDailyWorkshopBlackoutRules($configId: Int) {
    adminDailyWorkshopBlackoutRules(configId: $configId) {
      ...AdminDailyWorkshopBlackoutRuleFields
    }
  }
  ${ADMIN_DAILY_WORKSHOP_BLACKOUT_RULE_FIELDS}
`;
