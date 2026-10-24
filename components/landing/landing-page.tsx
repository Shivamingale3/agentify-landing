import BotSceneMount from "./bot-scene/bot-scene-mount";
import SiteHeader from "./header/site-header";
import SiteFooter from "./footer/site-footer";
import Story from "./story/story";

/** Server-rendered composition of "/". Client islands: canvas, story motion, header CTA, copy button. */
export default function LandingPage() {
  return (
    <>
      <BotSceneMount />
      <SiteHeader />
      <main className="relative z-10">
        <Story />
      </main>
      <SiteFooter />
    </>
  );
}
