import { HOME_DESCRIPTION, HOME_TITLE, SITE, absoluteUrl } from "@/lib/seo/site";

/**
 * Only claims verifiable from the page itself: no offers or ratings for a
 * product that's still "coming soon". Fabricated structured data risks a manual action.
 */
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: SITE.name,
      url: absoluteUrl("/"),
      slogan: SITE.tagline,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: SITE.name,
      url: absoluteUrl("/"),
      description: HOME_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": absoluteUrl("/#organization") },
    },
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/#webpage"),
      url: absoluteUrl("/"),
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#organization") },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/opengraph-image") },
    },
  ],
};

/** Server-rendered so non-JS crawlers see it; `<` escaped against HTML injection. */
export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
