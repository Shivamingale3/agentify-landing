import { SITE } from "@/lib/seo/site";
import GetStartedButton from "./get-started-button";

/** Fixed brand bar. The scrim keeps it legible over the cards passing beneath. */
export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between bg-linear-to-b from-background/90 via-background/60 to-transparent px-6 py-6 md:px-10 md:py-8">
      <div className="inline-flex items-center gap-2">
        {/* decorative: the brand name is right beside it */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimise */}
        <img src="/logo-mark.svg" alt="" width={20} height={20} />
        <div className="flex flex-col leading-none">
          <span className="text-xs font-bold uppercase tracking-wider">{SITE.name}</span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
            {SITE.tagline}
          </span>
        </div>
      </div>
      <GetStartedButton />
    </header>
  );
}
