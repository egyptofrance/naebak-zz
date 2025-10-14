import { Locale } from "./i18n/routing";

export const ADMIN_USER_LIST_VIEW_PAGE_SIZE = 10;
export const ADMIN_ORGANIZATION_LIST_VIEW_PAGE_SIZE = 10;
export const PRODUCT_NAME = "NextBase";
export const SIDEBAR_VISIBILITY_COOKIE_KEY = "sidebar_visibility";
export const MOBILE_MEDIA_QUERY_MATCHER = "(max-width: 1023px)";
export const PAYMENT_PROVIDER: "stripe" | "lemonsqueezy" = "stripe";
export const RESTRICTED_SLUG_NAMES = [
  "admin",
  "app_admin",
  "terms",
  "privacy",
  "login",
  "sign-up",
  "forgot-password",
  "reset-password",
  "email-confirmation",
  "redirecting-please-wait",
  "404",
  "500",
  "403",
  "error",
  "home",
  "team",
  "team-settings",
  "members",
  "onboarding",
  "dashboard",
  "billing",
  "profile",
  "organization",
  "settings",
  "billing-portal",
  "invitations",
  "invite-members",
  "invite-members-success",
  "invite-members-error",
  "project",
  "projects",
  "user",
  "account",
  "users",
  "accounts",
  "blog",
  "docs",
  "feedback",
];

// starts with a letter, ends with a letter or number, and can contain letters, numbers, and hyphens
export const SLUG_PATTERN = /^[a-zA-Z0-9-]+$/;
export const LOCALES = ["en", "de"] as const;
export function isValidLocale(
  locale: string,
): locale is (typeof LOCALES)[number] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return LOCALES.includes(locale as any);
}
// eg: en|de
export const LOCALE_GLOB_PATTERN = `${LOCALES.join("|")}`;
export const DEFAULT_LOCALE: Locale = "en";

export const FEEDBACK_BG_BOARD_COLORS = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  rose: "bg-rose-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  yellow: "bg-yellow-500",
  lime: "bg-lime-500",
  green: "bg-green-500",
  teal: "bg-teal-500",
  cyan: "bg-cyan-500",
} as const;

export type FeedbackBoardColor = keyof typeof FEEDBACK_BG_BOARD_COLORS;

export function getFeedbackBoardColorClass(color: string | null): string {
  if (!color) return "bg-black";
  return `${FEEDBACK_BG_BOARD_COLORS[color as FeedbackBoardColor] || "bg-black"}`;
}
