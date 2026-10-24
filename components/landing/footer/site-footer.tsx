import { SITE } from "@/lib/seo/site";
import ExternalLink from "./external-link";

export default function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between md:px-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="label-eyebrow">{SITE.name} · speculative concept</span>
            <span className="badge border border-border-strong text-muted-foreground">Coming soon</span>
          </div>
          <p className="text-xl font-bold uppercase leading-none tracking-wide">{SITE.tagline}</p>
        </div>
        <p className="flex flex-col gap-1 text-xs text-muted-foreground md:items-end">
          <span>
            3D head asset ·{" "}
            <ExternalLink href="https://sketchfab.com/3d-models/ghost-in-the-shell-cyborg-head-7a3ad0a509a746b5acaf206d638a2d8a">
              &ldquo;Ghost in the Shell Cyborg Head&rdquo;
            </ExternalLink>{" "}
            by <ExternalLink href="https://sketchfab.com/nikars">PolyBoi</ExternalLink>
          </span>
          <span>
            licensed under{" "}
            <ExternalLink href="http://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</ExternalLink>.
          </span>
        </p>
      </div>
    </footer>
  );
}
