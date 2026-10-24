import { env } from "@/lib/env";

/**
 * Single source for every SEO surface (metadata, robots, sitemap, JSON-LD, OG).
 * Server-only: it reads FRONTEND_URL, so never import it from a client component.
 */
export const SITE = {
  name: env.NEXT_PUBLIC_APP_NAME,
  url: env.FRONTEND_URL,
  tagline: "Ship an agent, not a chatbot.",
  locale: "en_US",
} as const;

/** The `/` page title. Used verbatim as `<title>` and `og:title`. */
export const HOME_TITLE = `${SITE.name} — ship an agent, not a chatbot.`;

/** ~155 chars before SERPs truncate; the lead clause carries the pitch. */
export const HOME_DESCRIPTION =
  "Assemble a real agentic bot in a minute — persona, knowledge, tools, embed one line of HTML. For sales teams that ship leads to CRM, calendars, and DB without writing code.";

/** Shorter variant for social cards, where previews clip harder than SERPs. */
export const SOCIAL_DESCRIPTION =
  "Persona. Knowledge. Tools. One embed line. No code. No reinstall.";

export const OG_IMAGE_ALT = `${SITE.name} — ${SITE.tagline}`;

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();
