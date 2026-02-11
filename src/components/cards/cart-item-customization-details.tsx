"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ProductCustomizationData } from "@/graphql/generated/types";

interface CartItemCustomizationDetailsProps {
  customData: ProductCustomizationData;
  basePrice: number;
  customizationModifier: number;
  effectivePrice: number;
  isExpanded: boolean;
  onToggle: () => void;
  variant: "mobile" | "desktop";
}

export function CartItemCustomizationDetails({
  customData,
  basePrice,
  customizationModifier,
  effectivePrice,
  isExpanded,
  onToggle,
  variant,
}: CartItemCustomizationDetailsProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={isMobile ? "mt-3 lg:hidden" : "mt-3 hidden lg:block"}>
      <button
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between rounded-lg bg-neutral-50 text-left",
          isMobile ? "px-3 py-2" : "px-4 py-2",
        )}
      >
        <span
          className={cn(
            "font-medium text-neutral-600",
            isMobile ? "text-xs" : "text-sm",
          )}
        >
          View Customization Details
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-neutral-400 transition-transform",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {isMobile ? (
              <MobileCustomizationContent
                customData={customData}
                basePrice={basePrice}
                customizationModifier={customizationModifier}
              />
            ) : (
              <DesktopCustomizationContent
                customData={customData}
                basePrice={basePrice}
                customizationModifier={customizationModifier}
                effectivePrice={effectivePrice}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MobileCustomizationContentProps {
  customData: ProductCustomizationData;
  basePrice: number;
  customizationModifier: number;
}

function MobileCustomizationContent({
  customData,
  basePrice,
  customizationModifier,
}: MobileCustomizationContentProps) {
  return (
    <div className="space-y-1.5 pt-2">
      {customData.options.map((option) => (
        <div
          key={option.optionId}
          className="flex items-center justify-between text-xs"
        >
          <span className="text-neutral-500">{option.name}</span>
          <span className="font-medium text-neutral-700">
            {option.value}
            {option.priceModifier !== 0 && (
              <span className="text-primary ml-1">
                {option.priceModifier > 0 ? "+" : ""}₹
                {option.priceModifier.toLocaleString()}
              </span>
            )}
          </span>
        </div>
      ))}
      <div className="border-t border-neutral-100 pt-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-500">Base Price</span>
          <span className="text-neutral-700">
            ₹{basePrice.toLocaleString()}
          </span>
        </div>
        {customizationModifier !== 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500">Customization</span>
            <span className="text-primary font-medium">
              {customizationModifier > 0 ? "+" : ""}₹
              {customizationModifier.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface DesktopCustomizationContentProps {
  customData: ProductCustomizationData;
  basePrice: number;
  customizationModifier: number;
  effectivePrice: number;
}

function DesktopCustomizationContent({
  customData,
  basePrice,
  customizationModifier,
  effectivePrice,
}: DesktopCustomizationContentProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 px-4 pt-3">
        {customData.options.map((option) => (
          <div
            key={option.optionId}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-neutral-500">{option.name}</span>
            <span className="font-medium text-neutral-700">
              {option.value}
              {option.priceModifier !== 0 && (
                <span className="text-primary ml-1.5">
                  {option.priceModifier > 0 ? "+" : ""}₹
                  {option.priceModifier.toLocaleString()}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 border-t border-neutral-100 px-4 pt-2">
        <div className="flex items-center gap-4 text-sm">
          <span className="text-neutral-500">
            Base: ₹{basePrice.toLocaleString()}
          </span>
          {customizationModifier !== 0 && (
            <span className="text-primary font-medium">
              Customization: {customizationModifier > 0 ? "+" : ""}₹
              {customizationModifier.toLocaleString()}
            </span>
          )}
          <span className="ml-auto font-semibold text-neutral-900">
            Total: ₹{effectivePrice.toLocaleString()}
          </span>
        </div>
      </div>
    </>
  );
}
