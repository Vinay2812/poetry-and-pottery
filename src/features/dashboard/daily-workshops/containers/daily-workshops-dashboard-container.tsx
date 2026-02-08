"use client";

import {
  createDailyWorkshopConfig,
  deleteDailyWorkshopBlackoutRule,
  deleteDailyWorkshopConfig,
  deleteDailyWorkshopPricingTier,
  getDailyWorkshopBlackoutRules,
  getDailyWorkshopPricingTiers,
  updateDailyWorkshopConfig,
  upsertDailyWorkshopBlackoutRule,
  upsertDailyWorkshopPricingTier,
} from "@/data/admin/daily-workshops/gateway/server";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { createDate } from "@/lib/date";

import type {
  AdminDailyWorkshopBlackoutRule,
  AdminDailyWorkshopConfig,
  AdminDailyWorkshopPricingTier,
  AdminUpdateDailyWorkshopConfigInput,
} from "@/graphql/generated/types";
import { DailyWorkshopBlackoutType } from "@/graphql/generated/types";

import { DailyWorkshopsDashboard } from "../components/daily-workshops-dashboard";
import {
  type BlackoutFormErrors,
  type ConfigFormErrors,
  type DailyWorkshopsDashboardContainerProps,
  type DailyWorkshopsDashboardTab,
  buildDailyWorkshopsDashboardViewModel,
  createInitialBlackoutDraft,
  createInitialTierDraft,
  timeInputToMinutes,
  toBlackoutDraft,
  toBlackoutInput,
  toTierInput,
} from "../types";

function toConfigForm(
  config: AdminDailyWorkshopConfig,
): AdminUpdateDailyWorkshopConfigInput {
  return {
    name: config.name,
    description: config.description ?? "",
    is_active: config.is_active,
    timezone: config.timezone,
    opening_hour: config.opening_hour,
    closing_hour: config.closing_hour,
    slot_duration_minutes: config.slot_duration_minutes,
    slot_capacity: config.slot_capacity,
    booking_window_days: config.booking_window_days,
    auto_cancel_on_blackout: config.auto_cancel_on_blackout,
  };
}

function createEmptyConfigForm(): AdminUpdateDailyWorkshopConfigInput {
  return {
    name: "",
    description: "",
    is_active: true,
    timezone: "Asia/Kolkata",
    opening_hour: 13,
    closing_hour: 19,
    slot_duration_minutes: 60,
    slot_capacity: 6,
    booking_window_days: 90,
    auto_cancel_on_blackout: true,
  };
}

function upsertConfigInList(
  configs: AdminDailyWorkshopConfig[],
  config: AdminDailyWorkshopConfig,
): AdminDailyWorkshopConfig[] {
  const index = configs.findIndex((item) => item.id === config.id);

  if (index === -1) {
    return [config, ...configs];
  }

  return configs.map((item) => (item.id === config.id ? config : item));
}

function upsertTierInList(
  tiers: AdminDailyWorkshopPricingTier[],
  tier: AdminDailyWorkshopPricingTier,
): AdminDailyWorkshopPricingTier[] {
  const index = tiers.findIndex((existing) => existing.id === tier.id);

  if (index === -1) {
    return [...tiers, tier];
  }

  return tiers.map((existing) => (existing.id === tier.id ? tier : existing));
}

function upsertRuleInList(
  rules: AdminDailyWorkshopBlackoutRule[],
  rule: AdminDailyWorkshopBlackoutRule,
): AdminDailyWorkshopBlackoutRule[] {
  const index = rules.findIndex((existing) => existing.id === rule.id);

  if (index === -1) {
    return [rule, ...rules];
  }

  return rules.map((existing) => (existing.id === rule.id ? rule : existing));
}

function parseCsvIntegers(raw: string): number[] {
  return raw
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isInteger(value));
}

function validateConfigForm(
  form: AdminUpdateDailyWorkshopConfigInput,
): ConfigFormErrors {
  const errors: ConfigFormErrors = {};
  const openingHour = form.opening_hour;
  const closingHour = form.closing_hour;
  const slotDurationMinutes = form.slot_duration_minutes;
  const slotCapacity = form.slot_capacity;
  const bookingWindowDays = form.booking_window_days;

  if (!form.name?.trim()) {
    errors.name = "Workshop name is required";
  }

  if (!form.timezone?.trim()) {
    errors.timezone = "Timezone is required";
  }

  if (typeof openingHour !== "number" || openingHour < 0 || openingHour > 23) {
    errors.opening_hour = "Opening hour must be between 0 and 23";
  }

  if (typeof closingHour !== "number" || closingHour < 1 || closingHour > 24) {
    errors.closing_hour = "Closing hour must be between 1 and 24";
  }

  if (
    typeof openingHour === "number" &&
    typeof closingHour === "number" &&
    openingHour >= closingHour
  ) {
    errors.opening_hour = "Opening hour must be earlier than closing hour";
    errors.closing_hour = "Closing hour must be later than opening hour";
  }

  if (
    typeof slotDurationMinutes !== "number" ||
    slotDurationMinutes < 15 ||
    slotDurationMinutes % 15 !== 0
  ) {
    errors.slot_duration_minutes =
      "Slot duration must be at least 15 minutes in 15-minute steps";
  }

  if (typeof slotCapacity !== "number" || slotCapacity < 1) {
    errors.slot_capacity = "Slot capacity must be at least 1";
  }

  if (
    typeof bookingWindowDays !== "number" ||
    bookingWindowDays < 1 ||
    bookingWindowDays > 90
  ) {
    errors.booking_window_days = "Booking window must be between 1 and 90 days";
  }

  return errors;
}

function validateBlackoutDraft(draft: {
  name: string;
  timezone: string;
  startTime: string;
  endTime: string;
  oneTimeDate: string;
  recurrenceStartDate: string;
  recurrenceEndDate: string;
  weekdaysCsv: string;
  monthDaysCsv: string;
  type: DailyWorkshopBlackoutType;
}): BlackoutFormErrors {
  const errors: BlackoutFormErrors = {};

  if (!draft.name.trim()) {
    errors.name = "Rule name is required";
  }

  if (!draft.timezone.trim()) {
    errors.timezone = "Timezone is required";
  }

  if (!draft.startTime) {
    errors.startTime = "Start time is required";
  }

  if (!draft.endTime) {
    errors.endTime = "End time is required";
  }

  const startMinutes = timeInputToMinutes(draft.startTime);
  const endMinutes = timeInputToMinutes(draft.endTime);
  if (startMinutes >= endMinutes) {
    errors.startTime = "Start time must be before end time";
    errors.endTime = "End time must be after start time";
  }

  if (draft.type === DailyWorkshopBlackoutType.OneTime) {
    if (!draft.oneTimeDate) {
      errors.oneTimeDate = "Date is required for one-time blackout";
    }
    return errors;
  }

  if (!draft.recurrenceStartDate) {
    errors.recurrenceStartDate =
      "Start date is required for recurring blackout";
  }

  if (
    draft.recurrenceStartDate &&
    draft.recurrenceEndDate &&
    createDate(draft.recurrenceEndDate).getTime() <
      createDate(draft.recurrenceStartDate).getTime()
  ) {
    errors.recurrenceEndDate = "End date must be on or after start date";
  }

  if (draft.type === DailyWorkshopBlackoutType.Weekly) {
    const weekdays = parseCsvIntegers(draft.weekdaysCsv);
    if (weekdays.length === 0) {
      errors.weekdaysCsv = "Enter at least one weekday (0-6)";
    } else if (weekdays.some((day) => day < 0 || day > 6)) {
      errors.weekdaysCsv = "Weekdays must be numbers between 0 and 6";
    }
  }

  if (draft.type === DailyWorkshopBlackoutType.Monthly) {
    const monthDays = parseCsvIntegers(draft.monthDaysCsv);
    if (monthDays.length === 0) {
      errors.monthDaysCsv = "Enter at least one month day (1-31)";
    } else if (monthDays.some((day) => day < 1 || day > 31)) {
      errors.monthDaysCsv = "Month days must be numbers between 1 and 31";
    }
  }

  return errors;
}

export function DailyWorkshopsDashboardContainer({
  configs: initialConfigs,
  initialConfigId,
  pricingTiers: initialPricingTiers,
  blackoutRules: initialBlackoutRules,
}: DailyWorkshopsDashboardContainerProps) {
  const initialSelectedConfig =
    initialConfigs.find((config) => config.id === initialConfigId) ??
    initialConfigs[0] ??
    null;

  const [configs, setConfigs] = useState(initialConfigs);
  const [selectedConfigId, setSelectedConfigId] = useState<number | null>(
    initialSelectedConfig?.id ?? null,
  );

  const [activeTab, setActiveTab] =
    useState<DailyWorkshopsDashboardTab>("config");
  const [isPending, startTransition] = useTransition();

  const [configData, setConfigData] = useState<AdminDailyWorkshopConfig | null>(
    initialSelectedConfig,
  );
  const [configForm, setConfigForm] =
    useState<AdminUpdateDailyWorkshopConfigInput>(
      initialSelectedConfig
        ? toConfigForm(initialSelectedConfig)
        : createEmptyConfigForm(),
    );
  const [configFormErrors, setConfigFormErrors] = useState<ConfigFormErrors>(
    {},
  );

  const [pricingTiers, setPricingTiers] = useState(initialPricingTiers);
  const [tierDraft, setTierDraft] = useState(createInitialTierDraft());
  const [editingTierId, setEditingTierId] = useState<number | null>(null);

  const [blackoutRules, setBlackoutRules] = useState(initialBlackoutRules);
  const [blackoutDraft, setBlackoutDraft] = useState(
    createInitialBlackoutDraft(
      initialSelectedConfig?.timezone ?? "Asia/Kolkata",
    ),
  );
  const [blackoutFormErrors, setBlackoutFormErrors] =
    useState<BlackoutFormErrors>({});
  const [editingBlackoutId, setEditingBlackoutId] = useState<string | null>(
    null,
  );

  const viewModel = useMemo(() => {
    if (!configData) return null;

    return buildDailyWorkshopsDashboardViewModel(
      configData,
      pricingTiers,
      blackoutRules,
      activeTab,
    );
  }, [activeTab, blackoutRules, configData, pricingTiers]);

  const resetEditorDrafts = useCallback((timezone: string) => {
    setTierDraft(createInitialTierDraft());
    setEditingTierId(null);
    setBlackoutDraft(createInitialBlackoutDraft(timezone));
    setEditingBlackoutId(null);
    setBlackoutFormErrors({});
  }, []);

  const handleSelectConfig = useCallback(
    (configId: number) => {
      const selectedConfig = configs.find((config) => config.id === configId);
      if (!selectedConfig) return;

      setSelectedConfigId(configId);
      setConfigData(selectedConfig);
      setConfigForm(toConfigForm(selectedConfig));
      setConfigFormErrors({});
      setPricingTiers([]);
      setBlackoutRules([]);
      resetEditorDrafts(selectedConfig.timezone);

      startTransition(async () => {
        try {
          const [nextPricingTiers, nextBlackoutRules] = await Promise.all([
            getDailyWorkshopPricingTiers(configId),
            getDailyWorkshopBlackoutRules(configId),
          ]);

          setPricingTiers(nextPricingTiers);
          setBlackoutRules(nextBlackoutRules);
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load config details",
          );
        }
      });
    },
    [configs, resetEditorDrafts],
  );

  const handleCreateConfig = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await createDailyWorkshopConfig();
        const createdConfig = result.config;

        if (!result.success || !createdConfig) {
          toast.error(result.error || "Failed to create config");
          return;
        }

        setConfigs((current) => [createdConfig, ...current]);
        setSelectedConfigId(createdConfig.id);
        setConfigData(createdConfig);
        setConfigForm(toConfigForm(createdConfig));
        setConfigFormErrors({});
        setPricingTiers([]);
        setBlackoutRules([]);
        resetEditorDrafts(createdConfig.timezone);
        setActiveTab("config");
        toast.success("Daily workshop config created");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to create config",
        );
      }
    });
  }, [resetEditorDrafts]);

  const handleDeleteConfig = useCallback(() => {
    if (!selectedConfigId) {
      toast.error("No config selected");
      return;
    }

    if (
      !window.confirm(
        "Delete this config and all its pricing tiers and blackout rules?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteDailyWorkshopConfig(selectedConfigId);

        if (!result.success) {
          toast.error(result.error || "Failed to delete config");
          return;
        }

        const remainingConfigs = configs.filter(
          (config) => config.id !== selectedConfigId,
        );

        setConfigs(remainingConfigs);

        const nextConfig = remainingConfigs[0] ?? null;
        if (!nextConfig) {
          setSelectedConfigId(null);
          setConfigData(null);
          setConfigForm(createEmptyConfigForm());
          setConfigFormErrors({});
          setPricingTiers([]);
          setBlackoutRules([]);
          resetEditorDrafts("Asia/Kolkata");
          toast.success("Config deleted");
          return;
        }

        setSelectedConfigId(nextConfig.id);
        setConfigData(nextConfig);
        setConfigForm(toConfigForm(nextConfig));
        setConfigFormErrors({});
        setPricingTiers([]);
        setBlackoutRules([]);
        resetEditorDrafts(nextConfig.timezone);

        const [nextPricingTiers, nextBlackoutRules] = await Promise.all([
          getDailyWorkshopPricingTiers(nextConfig.id),
          getDailyWorkshopBlackoutRules(nextConfig.id),
        ]);

        setPricingTiers(nextPricingTiers);
        setBlackoutRules(nextBlackoutRules);

        toast.success("Config deleted");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete config",
        );
      }
    });
  }, [configs, resetEditorDrafts, selectedConfigId]);

  const handleConfigFormChange = useCallback(
    (
      field: keyof AdminUpdateDailyWorkshopConfigInput,
      value: string | number | boolean,
    ) => {
      setConfigForm((current) => ({
        ...current,
        [field]: value,
      }));
      setConfigFormErrors({});
    },
    [],
  );

  const handleSaveConfig = useCallback(() => {
    if (!selectedConfigId) {
      toast.error("No config selected");
      return;
    }

    const validationErrors = validateConfigForm(configForm);
    if (Object.keys(validationErrors).length > 0) {
      setConfigFormErrors(validationErrors);
      toast.error("Please fix required config fields");
      return;
    }

    startTransition(async () => {
      try {
        const result = await updateDailyWorkshopConfig(
          configForm,
          selectedConfigId,
        );
        const updatedConfig = result.config;

        if (!result.success || !updatedConfig) {
          toast.error(result.error || "Failed to update configuration");
          return;
        }

        setConfigs((current) => upsertConfigInList(current, updatedConfig));
        setConfigData(updatedConfig);
        setConfigForm(toConfigForm(updatedConfig));
        setConfigFormErrors({});
        setBlackoutDraft((current) => ({
          ...current,
          timezone: updatedConfig.timezone,
        }));
        toast.success("Daily workshop configuration updated");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update configuration",
        );
      }
    });
  }, [configForm, selectedConfigId]);

  const handleTierDraftChange = useCallback(
    (field: keyof typeof tierDraft, value: string | number | boolean) => {
      setTierDraft((current) => ({
        ...current,
        [field]: value,
      }));
    },
    [],
  );

  const handleSaveTier = useCallback(() => {
    if (!selectedConfigId) {
      toast.error("No config selected");
      return;
    }

    if (tierDraft.hours < 1) {
      toast.error("Tier hours must be at least 1");
      return;
    }

    if (tierDraft.price_per_person < 0 || tierDraft.pieces_per_person < 0) {
      toast.error("Pricing and pieces must be non-negative");
      return;
    }

    startTransition(async () => {
      try {
        const result = await upsertDailyWorkshopPricingTier(
          toTierInput(tierDraft, editingTierId ?? undefined),
          selectedConfigId,
        );

        if (!result.success || !result.tier) {
          toast.error(result.error || "Failed to save tier");
          return;
        }

        setPricingTiers((current) => upsertTierInList(current, result.tier!));
        setTierDraft(createInitialTierDraft());
        setEditingTierId(null);
        toast.success(editingTierId ? "Tier updated" : "Tier added");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to save tier",
        );
      }
    });
  }, [editingTierId, selectedConfigId, tierDraft]);

  const handleEditTier = useCallback(
    (tierId: number) => {
      const tier = pricingTiers.find(
        (currentTier) => currentTier.id === tierId,
      );
      if (!tier) return;

      setTierDraft({
        hours: tier.hours,
        price_per_person: tier.price_per_person,
        pieces_per_person: tier.pieces_per_person,
        sort_order: tier.sort_order,
        is_active: tier.is_active,
      });
      setEditingTierId(tier.id);
      setActiveTab("pricing");
    },
    [pricingTiers],
  );

  const handleCancelTierEdit = useCallback(() => {
    setTierDraft(createInitialTierDraft());
    setEditingTierId(null);
  }, []);

  const handleDeleteTier = useCallback(
    (tierId: number) => {
      if (!window.confirm("Delete this pricing tier?")) return;

      startTransition(async () => {
        try {
          const result = await deleteDailyWorkshopPricingTier(tierId);
          if (!result.success) {
            toast.error(result.error || "Failed to delete tier");
            return;
          }

          setPricingTiers((current) =>
            current.filter((tier) => tier.id !== tierId),
          );
          if (editingTierId === tierId) {
            setTierDraft(createInitialTierDraft());
            setEditingTierId(null);
          }
          toast.success("Tier deleted");
        } catch (error) {
          toast.error(
            error instanceof Error ? error.message : "Failed to delete tier",
          );
        }
      });
    },
    [editingTierId],
  );

  const handleBlackoutDraftChange = useCallback(
    (field: keyof typeof blackoutDraft, value: string | boolean) => {
      setBlackoutDraft((current) => ({
        ...current,
        [field]: value,
      }));
      setBlackoutFormErrors({});
    },
    [],
  );

  const handleSaveBlackout = useCallback(() => {
    if (!selectedConfigId) {
      toast.error("No config selected");
      return;
    }

    const validationErrors = validateBlackoutDraft(blackoutDraft);
    if (Object.keys(validationErrors).length > 0) {
      setBlackoutFormErrors(validationErrors);
      toast.error("Please fix required blackout rule fields");
      return;
    }

    startTransition(async () => {
      try {
        const result = await upsertDailyWorkshopBlackoutRule(
          toBlackoutInput(blackoutDraft, editingBlackoutId ?? undefined),
          selectedConfigId,
        );

        if (!result.success || !result.rule) {
          toast.error(result.error || "Failed to save blackout rule");
          return;
        }

        setBlackoutRules((current) => upsertRuleInList(current, result.rule!));
        setBlackoutDraft(
          createInitialBlackoutDraft(configData?.timezone ?? "Asia/Kolkata"),
        );
        setBlackoutFormErrors({});
        setEditingBlackoutId(null);
        toast.success(editingBlackoutId ? "Rule updated" : "Rule created");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to save blackout rule",
        );
      }
    });
  }, [blackoutDraft, configData, editingBlackoutId, selectedConfigId]);

  const handleEditBlackout = useCallback(
    (ruleId: string) => {
      const rule = blackoutRules.find(
        (currentRule) => currentRule.id === ruleId,
      );
      if (!rule) return;

      setBlackoutDraft(toBlackoutDraft(rule));
      setBlackoutFormErrors({});
      setEditingBlackoutId(rule.id);
      setActiveTab("blackouts");
    },
    [blackoutRules],
  );

  const handleCancelBlackoutEdit = useCallback(() => {
    setBlackoutDraft(
      createInitialBlackoutDraft(configData?.timezone ?? "Asia/Kolkata"),
    );
    setBlackoutFormErrors({});
    setEditingBlackoutId(null);
  }, [configData?.timezone]);

  const handleDeleteBlackout = useCallback(
    (ruleId: string) => {
      if (!window.confirm("Delete this blackout rule?")) return;

      startTransition(async () => {
        try {
          const result = await deleteDailyWorkshopBlackoutRule(ruleId);
          if (!result.success) {
            toast.error(result.error || "Failed to delete blackout rule");
            return;
          }

          setBlackoutRules((current) =>
            current.filter((rule) => rule.id !== ruleId),
          );

          if (editingBlackoutId === ruleId) {
            setBlackoutDraft(
              createInitialBlackoutDraft(
                configData?.timezone ?? "Asia/Kolkata",
              ),
            );
            setBlackoutFormErrors({});
            setEditingBlackoutId(null);
          }

          toast.success("Blackout rule deleted");
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to delete blackout rule",
          );
        }
      });
    },
    [configData, editingBlackoutId],
  );

  return (
    <DailyWorkshopsDashboard
      configs={configs}
      selectedConfigId={selectedConfigId}
      viewModel={viewModel}
      isPending={isPending}
      configForm={configForm}
      configFormErrors={configFormErrors}
      tierDraft={tierDraft}
      blackoutDraft={blackoutDraft}
      blackoutFormErrors={blackoutFormErrors}
      editingTierId={editingTierId}
      editingBlackoutId={editingBlackoutId}
      onSelectConfig={handleSelectConfig}
      onCreateConfig={handleCreateConfig}
      onDeleteConfig={handleDeleteConfig}
      onTabChange={setActiveTab}
      onConfigFormChange={handleConfigFormChange}
      onSaveConfig={handleSaveConfig}
      onTierDraftChange={handleTierDraftChange}
      onSaveTier={handleSaveTier}
      onEditTier={handleEditTier}
      onCancelTierEdit={handleCancelTierEdit}
      onDeleteTier={handleDeleteTier}
      onBlackoutDraftChange={handleBlackoutDraftChange}
      onSaveBlackout={handleSaveBlackout}
      onEditBlackout={handleEditBlackout}
      onCancelBlackoutEdit={handleCancelBlackoutEdit}
      onDeleteBlackout={handleDeleteBlackout}
    />
  );
}
