import {
  ArrowUpRightIcon,
  QuotesIcon,
  SealCheckIcon,
} from "@phosphor-icons/react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects } from "../content";
import { asset } from "../lib/asset";

const reviewed = projects.filter((p) => p.testimonial);

/**
 * Every client review in one place. Each one sits next to a picture of the
 * site it is about and links to that site, so a stranger can check the claim
 * rather than take it on trust — which is the only thing that makes a quote
 * on a designer's own website worth anything.
 */
export default function Testimonials({
  heading = true,
}: {
  heading?: boolean;
}) {
  if (reviewed.length === 0) return null;

  return (
    <section
      id="reviews"
      aria-labelledby={heading ? "reviews-title" : undefined}
      className="relative px-gutter pt-24 pb-28 md:pt-32 md:pb-36"
    >
      {heading && (
        <SectionHeading
          id="reviews-title"
          index="01"
          label="Reviews"
          title="What clients say."
          subtitle="In their own words."
        >
          Each review was written by the client themselves and published with
          their permission. Open their site and judge the work for yourself.
        </SectionHeading>
      )}

      <ul
        className={`space-y-16 md:space-y-20 ${heading ? "mt-16 lg:mt-20" : ""}`}
      >
        {reviewed.map((project, i) => {
          const { testimonial } = project;
          if (!testimonial) return null;

          return (
            <li key={project.title}>
              <Reveal
                delay={0.05 * i}
                className="grid gap-8 overflow-hidden rounded-3xl border border-line bg-surface/50 p-6 sm:p-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-11"
              >
                {/* The words come first, in the reading order and in the markup */}
                <div>
                  <QuotesIcon
                    size={32}
                    weight="fill"
                    aria-hidden="true"
                    className="text-accent-soft"
                  />
                  <blockquote
                    className="mt-5 font-display text-[1.3rem] leading-[1.5] text-ink sm:text-[1.55rem]"
                    style={{ fontWeight: 500, textWrap: "pretty" }}
                  >
                    {testimonial.quote}
                  </blockquote>

                  <figcaption className="mt-7 border-t border-line pt-6">
                    <p
                      className="font-display text-[1.05rem] text-ink"
                      style={{ fontWeight: 600 }}
                    >
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-[15px] text-ink-muted">
                      {testimonial.role}
                      {testimonial.source && (
                        <span className="text-ink-subtle">
                          {" "}
                          &middot; {testimonial.source}
                        </span>
                      )}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                      {project.caseStudy && (
                        <a
                          href={`/work/${project.caseStudy}/`}
                          className="group/cs inline-flex items-center gap-1.5 text-[15px] font-medium text-accent-soft no-underline transition-colors hover:text-accent-bright"
                        >
                          Read the {project.title} case study
                          <ArrowUpRightIcon
                            size={14}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
                          />
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/live inline-flex items-center gap-1.5 text-[15px] text-ink-muted no-underline transition-colors hover:text-ink"
                      >
                        Visit the live site
                        <ArrowUpRightIcon
                          size={14}
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5"
                        />
                      </a>
                    </div>
                  </figcaption>
                </div>

                {/* The site the review is about, so the quote has something to point at */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${project.title} website`}
                  className="group/shot block overflow-hidden rounded-2xl border border-line-strong bg-page no-underline"
                >
                  <span className="flex items-center gap-1.5 border-b border-line bg-surface/80 px-4 py-2.5">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-white/15"
                    />
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-white/15"
                    />
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-white/15"
                    />
                    <span className="ml-2 truncate text-[12.5px] text-ink-subtle">
                      {project.url
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                    </span>
                  </span>
                  <img
                    src={asset(
                      project.image.replace("/work/", "/work/thumbs/"),
                    )}
                    alt={`The ${project.title} website`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={800}
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.02]"
                  />
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* Where these came from. A quote nobody can trace is worth nothing. */}
      <Reveal className="mt-16 flex flex-col gap-4 rounded-2xl border border-line bg-surface/40 px-6 py-6 sm:flex-row sm:items-start sm:gap-5 sm:px-8">
        <SealCheckIcon
          size={24}
          weight="fill"
          aria-hidden="true"
          className="shrink-0 text-accent-soft"
        />
        <p className="max-w-[80ch] text-[15.5px] leading-relaxed text-ink-muted">
          <span className="text-ink">
            These are real, and you can check them.
          </span>{" "}
          Each one was written by the client and published word for word, with
          nothing edited or tidied up. Some were sent to me through the form on
          this site; the ones marked as a Google review are public on my Google
          listing, where you can read them for yourself. Every review links to
          the business it came from and the site I built for them.
        </p>
      </Reveal>
    </section>
  );
}
