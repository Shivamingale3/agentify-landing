import { TOTAL_STEPS } from "@/lib/story/timeline";

export type Step = { label: string; headline: string; sub: string };

/** One entry per assembly step; must stay TOTAL_STEPS long. */
export const STEPS: Step[] = [
  {
    label: "Sign in",
    headline: "Sign in. Or don't.",
    sub: "The thing you build here runs on a URL — not your account, not your dashboard, not your data.",
  },
  {
    label: "Create",
    headline: "New bot. Three fields.",
    sub: "Name, persona, the do's and the don'ts. Hit enter. You're done.",
  },
  {
    label: "Persona",
    headline: "The eyes come next.",
    sub: "Boundaries wired into the gaze — what to say, what to refuse, where to stop.",
  },
  {
    label: "Knowledge",
    headline: "Drop docs. Connect your DB.",
    sub: "It reads. It cites. It goes quiet when it doesn't know.",
  },
  {
    label: "Mind",
    headline: "Bring keys. Pick the brain.",
    sub: "OpenAI, Claude, Llama, your own — drop a key, pick an LLM, pick a vectorizer. Done.",
  },
  {
    label: "Tools",
    headline: "Tools. Where the agent earns its keep.",
    sub: "Wire HubSpot, Calendly, Postgres, Stripe. The bot calls the right one when it should — no prompt-engineering you to red.",
  },
  {
    label: "Embed",
    headline: "It closes up.",
    sub: "Plates snap in. One embeddable URL. That is the whole deliverable.",
  },
  {
    label: "Ship",
    headline: "Paste one line. Reload.",
    sub: "Your site runs an agent. No reinstall, no SDK, no React rewrite, no engineer on the call.",
  },
];

if (STEPS.length !== TOTAL_STEPS) {
  throw new Error(`STEPS has ${STEPS.length} entries, timeline expects ${TOTAL_STEPS}`);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "03 / 08 · Persona" */
export const stepEyebrow = (index: number) =>
  `${pad(index + 1)} / ${pad(TOTAL_STEPS)} · ${STEPS[index].label}`;
