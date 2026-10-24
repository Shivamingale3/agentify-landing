import StoryTrack from "./story-track";
import Hero from "./hero";
import StepPanel from "./step-panel";
import StepCard from "./step-card";
import EmbedSnippet from "./embed-snippet";
import { STEPS } from "./steps";

/** The scroll-driven assembly story: hero, then one pinned card per step. */
export default function Story() {
  return (
    <StoryTrack>
      <Hero />
      {STEPS.map((_, i) => {
        const headingId = `step-${i + 1}-title`;
        return (
          <StepPanel key={headingId} step={i + 1} headingId={headingId}>
            <StepCard index={i} headingId={headingId}>
              {i === STEPS.length - 1 && <EmbedSnippet />}
            </StepCard>
          </StepPanel>
        );
      })}
    </StoryTrack>
  );
}
