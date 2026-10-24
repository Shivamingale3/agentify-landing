import type { Metadata } from "next";
import { preload } from "react-dom";
import LandingPage from "@/components/landing/landing-page";
import { MODEL_URL } from "@/components/landing/bot-scene/model";
import JsonLd from "@/lib/seo/json-ld";
import { HOME_DESCRIPTION, HOME_TITLE, SITE, SOCIAL_DESCRIPTION } from "@/lib/seo/site";

export const metadata: Metadata = {
  // `absolute` skips the layout's "%s · Agentify" template; the brand is already in the title
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  // Next replaces openGraph/twitter wholesale per segment, so restate the layout's fields
  openGraph: {
    title: HOME_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: "/",
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
};

export default function Home() {
  // Start the model download before the client-only scene chunk even loads.
  // as/crossOrigin must match GLTFLoader's request or the preload is wasted.
  preload(MODEL_URL, { as: "fetch", crossOrigin: "anonymous", type: "model/gltf-binary" });

  return (
    <>
      <JsonLd />
      <LandingPage />
    </>
  );
}
