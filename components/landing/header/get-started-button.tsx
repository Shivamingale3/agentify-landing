"use client";

import { Button } from "@/components/ui/button";

/** Login lives in the separate React app, so this is a full page load. */
const LOGIN_URL = "/login";
/** long enough for the smooth scroll to play the finale */
const REDIRECT_DELAY_MS = 1000;

export default function GetStartedButton() {
  const start = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    setTimeout(() => window.location.assign(LOGIN_URL), REDIRECT_DELAY_MS);
  };

  return (
    <Button type="button" size="sm" onClick={start}>
      Get started
    </Button>
  );
}
