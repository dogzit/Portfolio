import { STORY } from "@/lib/data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FloatIn } from "@/components/shared/FloatIn";
import { Milestones } from "@/components/shared/Milestones";

/**
 * The long version. The hero gives two sentences; this is the whole arc, hung
 * off a centre thread: the era marked on the line, chapters alternating left
 * and right, each drifting in from its own side as it scrolls into view. The
 * compressed timeline sits underneath for anyone who'd rather skim.
 */
export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeader
          index="02"
          label="About"
          title="My story"
          note="Eleven years between the first computer I was allowed to touch and the first system my school actually runs on."
        />

        <div className="story-flow mt-14">
          {STORY.map((chapter, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <FloatIn key={chapter.title} from={side}>
                <article className="story-step" data-side={side}>
                  <p className="story-era">{chapter.era}</p>

                  <div className="story-main">
                    <h3 className="story-title font-display">{chapter.title}</h3>
                    <div className="story-body">
                      {chapter.body.map((para) => (
                        <p key={para.slice(0, 24)}>{para}</p>
                      ))}
                    </div>
                  </div>
                </article>
              </FloatIn>
            );
          })}

          <FloatIn>
            <figure className="story-aside">
              <blockquote className="font-display story-quote">
                I haven&apos;t won first place yet. What I&apos;m proud of is
                that each competition has been a step forward.
              </blockquote>
            </figure>
          </FloatIn>
        </div>

        <Milestones />

        <div className="lattice-foot border-b border-line">
          <span className="cell-label">dev.story()</span>
        </div>
      </div>
    </section>
  );
}
