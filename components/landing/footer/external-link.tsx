import type { ReactNode } from "react";

export default function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-border underline-offset-4 hover:text-foreground"
    >
      {children}
    </a>
  );
}
