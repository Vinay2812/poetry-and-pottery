import type { Appearance } from "@clerk/types";

/**
 * Shared Clerk appearance configuration for Poetry & Pottery.
 * Matches the forest theme with earthy greens, cream accents, and warm neutrals.
 */
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: "#4F6F52",
    colorText: "#1a1a1a",
    colorTextSecondary: "#737373",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#1a1a1a",
    borderRadius: "0.5rem",
    fontFamily: "'Outfit', ui-sans-serif, system-ui, sans-serif",
    fontSize: "14px",
  },
  elements: {
    card: "shadow-none bg-transparent",
    headerTitle: "font-display text-2xl font-extrabold text-neutral-900",
    headerSubtitle: "text-sm text-neutral-500 font-normal",
    socialButtonsBlockButton:
      "h-11 rounded-lg border-neutral-200 bg-white text-neutral-900 font-medium text-sm hover:bg-neutral-50 hover:border-neutral-300 transition-all",
    socialButtonsBlockButtonText: "font-medium text-sm",
    dividerLine: "bg-neutral-200",
    dividerText: "text-xs text-neutral-400 uppercase tracking-wider",
    formFieldLabel: "text-[13px] font-medium text-neutral-600",
    formFieldInput:
      "h-11 rounded-lg border-neutral-200 bg-white text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-neutral-400",
    formButtonPrimary:
      "h-11 rounded-lg bg-primary font-medium text-sm text-white shadow-sm hover:bg-primary-hover active:bg-primary-active transition-all",
    footerAction: "text-sm",
    footerActionLink: "text-primary font-medium hover:text-primary-hover",
    formFieldAction:
      "text-primary text-[13px] font-medium hover:text-primary-hover",
    identityPreviewEditButtonIcon: "text-primary",
    formResendCodeLink: "text-primary font-medium hover:text-primary-hover",
    otpCodeFieldInput:
      "border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/10",
    alternativeMethodsBlockButton:
      "text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-all",
    alert: "rounded-lg",
    avatarImageActionsUpload: "text-primary",
  },
};
