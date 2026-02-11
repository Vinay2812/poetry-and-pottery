"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { DailyWorkshopsDashboardProps } from "../types";
import { BlackoutRuleForm } from "./blackout-rule-form";
import { BlackoutRulesList } from "./blackout-rules-list";
import { ConfigPicker } from "./config-picker";
import { DailyWorkshopConfigForm } from "./daily-workshop-config-form";
import { DailyWorkshopSummaryCards } from "./daily-workshop-summary-cards";
import { PricingTierCard } from "./pricing-tier-card";
import { PricingTierForm } from "./pricing-tier-form";
import { PricingTiersTable } from "./pricing-tiers-table";

export function DailyWorkshopsDashboard({
  configs,
  selectedConfigId,
  viewModel,
  isPending,
  configForm,
  configFormErrors,
  tierDraft,
  blackoutDraft,
  blackoutFormErrors,
  editingTierId,
  editingBlackoutId,
  onSelectConfig,
  onCreateConfig,
  onDeleteConfig,
  onTabChange,
  onConfigFormChange,
  onSaveConfig,
  onTierDraftChange,
  onSaveTier,
  onEditTier,
  onCancelTierEdit,
  onDeleteTier,
  onBlackoutDraftChange,
  onSaveBlackout,
  onEditBlackout,
  onCancelBlackoutEdit,
  onDeleteBlackout,
}: DailyWorkshopsDashboardProps) {
  const hasSelectedConfig = Boolean(viewModel && selectedConfigId);

  if (!hasSelectedConfig || !viewModel) {
    return (
      <div className="space-y-6">
        <ConfigPicker
          configs={configs}
          selectedConfigId={selectedConfigId}
          isPending={isPending}
          onSelectConfig={onSelectConfig}
          onCreateConfig={onCreateConfig}
          onDeleteConfig={onDeleteConfig}
        />

        <section className="rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            No workshop config selected
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Create a config to manage pricing tiers and blackout rules.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ConfigPicker
        configs={configs}
        selectedConfigId={selectedConfigId}
        isPending={isPending}
        onSelectConfig={onSelectConfig}
        onCreateConfig={onCreateConfig}
        onDeleteConfig={onDeleteConfig}
      />

      <DailyWorkshopSummaryCards
        tiersCount={viewModel.summary.tiersCount}
        activeTiersCount={viewModel.summary.activeTiersCount}
        blackoutsCount={viewModel.summary.blackoutsCount}
        activeBlackoutsCount={viewModel.summary.activeBlackoutsCount}
        openingHourLabel={viewModel.config.openingHourLabel}
        closingHourLabel={viewModel.config.closingHourLabel}
        slotDurationLabel={viewModel.config.slotDurationLabel}
        bookingWindowDays={viewModel.config.bookingWindowDays}
      />

      <Tabs
        value={viewModel.activeTab}
        onValueChange={(value) =>
          onTabChange(value as typeof viewModel.activeTab)
        }
      >
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Tiers</TabsTrigger>
          <TabsTrigger value="blackouts">Blackout Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4 pt-5">
          <DailyWorkshopConfigForm
            configForm={configForm}
            configFormErrors={configFormErrors}
            openingHourLabel={viewModel.config.openingHourLabel}
            closingHourLabel={viewModel.config.closingHourLabel}
            isPending={isPending}
            onConfigFormChange={onConfigFormChange}
            onSaveConfig={onSaveConfig}
          />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4 pt-5">
          <PricingTierForm
            tierDraft={tierDraft}
            editingTierId={editingTierId}
            tiersCount={viewModel.summary.tiersCount}
            isPending={isPending}
            onTierDraftChange={onTierDraftChange}
            onSaveTier={onSaveTier}
            onCancelTierEdit={onCancelTierEdit}
          />

          <section className="rounded-2xl border bg-white p-5">
            {viewModel.pricingTiers.length === 0 ? (
              <p className="text-sm text-neutral-500">
                No pricing tiers configured yet.
              </p>
            ) : (
              <>
                <PricingTiersTable
                  tiers={viewModel.pricingTiers}
                  isPending={isPending}
                  onEditTier={onEditTier}
                  onDeleteTier={onDeleteTier}
                />

                <div className="space-y-3 lg:hidden">
                  {viewModel.pricingTiers.map((tier) => (
                    <PricingTierCard
                      key={tier.id}
                      hours={tier.hours}
                      pricePerPersonLabel={tier.pricePerPersonLabel}
                      piecesPerPerson={tier.piecesPerPerson}
                      sortOrder={tier.sortOrder}
                      isActive={tier.isActive}
                      updatedAtLabel={tier.updatedAtLabel}
                      isPending={isPending}
                      onEdit={() => onEditTier(tier.id)}
                      onDelete={() => onDeleteTier(tier.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </TabsContent>

        <TabsContent value="blackouts" className="space-y-4 pt-5">
          <div className="grid gap-4 xl:grid-cols-[1.05fr_1.3fr]">
            <BlackoutRuleForm
              blackoutDraft={blackoutDraft}
              blackoutFormErrors={blackoutFormErrors}
              editingBlackoutId={editingBlackoutId}
              isPending={isPending}
              onBlackoutDraftChange={onBlackoutDraftChange}
              onSaveBlackout={onSaveBlackout}
              onCancelBlackoutEdit={onCancelBlackoutEdit}
            />

            <BlackoutRulesList
              blackoutRules={viewModel.blackoutRules}
              blackoutsCount={viewModel.summary.blackoutsCount}
              isPending={isPending}
              onEditBlackout={onEditBlackout}
              onDeleteBlackout={onDeleteBlackout}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
