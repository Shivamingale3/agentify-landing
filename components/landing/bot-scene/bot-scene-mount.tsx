"use client";

import dynamic from "next/dynamic";

// WebGL is client-only; ssr: false lets the HTML paint first.
const BotScene = dynamic(() => import("./bot-scene"), { ssr: false });

/** Fixed, decorative canvas behind the page. Everything it shows is stated in the copy. */
export default function BotSceneMount() {
  return (
    <div aria-hidden className="fixed inset-0 z-0">
      <BotScene />
    </div>
  );
}
