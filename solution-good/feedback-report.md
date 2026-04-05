# Exercise Feedback Report

**Student:** Amir  
**Date:** 2026-04-05

---

## What was easy to understand?

The overall goal of the exercise was clear from the start. I liked that the introduction explained *why* we're doing this -- the idea that a design document is also an AI prompt clicked for me right away. It gave me a concrete quality bar: "could an LLM build this?" That's way more motivating than "write a detailed document."

The venue facts table and business rules were straightforward. Having everything in one table made it easy to reference while writing. The seating plan image was essential -- I kept going back to it to double-check my assumptions about seat positions.

The core requirements structure (Sections 1-8) gave me a really clear skeleton to work from. I didn't have to guess what to cover. I basically used it as my outline and filled in the details.

## What was confusing?

**Companion seats for non-accessibility bookings.** The exercise says wheelchair spaces can "only be booked by users who indicate an accessibility need" and that "each wheelchair space must include at least one companion seat." But it's not clear whether companion seats can be booked by *anyone* or only by wheelchair users. I made a design decision (companion seats are restricted to accessibility bookings and dimmed for standard users), but I wasn't sure if that was the intended interpretation. It's a meaningful UX decision and I think the exercise should either clarify this or explicitly flag it as a decision the student needs to make and justify.

**Scope of "no graphical mockups required."** I understood this to mean I don't need to create wireframes or Figma files. But I still felt pressure to be very visual in my writing (specifying exact colors, sizes in pixels, etc.). The worked examples set a very high bar for visual specificity. I sometimes wasn't sure if I was being *too* detailed about visual design versus not detailed enough. Is "24x24px rounded rectangle with border-radius 4px" the right level, or is that over-engineering?

**The "meta-level" constraint.** The exercise mentions that the document shouldn't be submittable as a design document itself, but I'm not entirely sure what that means in practice. My document *is* a design document -- that's what I was asked to write. Maybe this constraint is more about the exercise text itself not being too prescriptive? I re-read the tip a couple of times and still felt a bit uncertain.

## Where did I get stuck?

1. **Accessibility flow design.** I spent a lot of time deciding *when* in the flow to ask about wheelchair needs. Before showing selection? During? I went with "after selecting a showing" because it felt natural, but I can see arguments for other placements. The guiding question "At what point in the flow does the user declare their needs?" was exactly the right nudge -- it told me this was an important decision without telling me the answer.

2. **Real-time updates (advanced).** Specifying WebSocket behavior in a UX document felt a bit like crossing into technical architecture. I wasn't sure how deep to go. I tried to focus on what the *user* experiences rather than implementation details, but some technical description felt necessary to make it buildable.

3. **The line between "enough detail" and "too much."** This was a constant tension. The worked examples are very specific (exact hex colors, exact copy for error messages). I tried to match that level, but for a full document covering all sections, it's a LOT of writing. I had to be strategic about where to go deep and where to be more concise.

## What would I change about the exercise?

1. **Clarify the companion seat rule.** Add one sentence about whether companion seats are bookable by non-accessibility users. Even saying "this is your decision to make -- justify it" would help.

2. **Add a word/time estimate per section.** The overall estimate of 4-8 hours and 1500-2500 words is helpful, but I had no sense of how to allocate time across sections. Should the seat states section be the longest? The booking flow? I'd love a rough hint like "Sections 3-5 are where most of your depth should go."

3. **One more worked example, but for a different type.** The two examples are great -- one for a seat state, one for a flow step. I'd love a third that shows how to handle an edge case (Section 7 style). That section was the hardest to calibrate because I had no example to compare against.

4. **The advanced requirements could use a clearer "pick one or two" recommendation.** I tackled two (pricing display and real-time updates), but I wasn't sure if that was the right amount. The effort estimates helped, but a line like "most strong students tackle 1-2 advanced topics" would have helped me plan.

## How long would this take in real life?

I estimate this would take me about **6-7 hours** of focused work:
- ~30 min reading the exercise and studying the seating plan
- ~1 hour outlining and making key design decisions
- ~3 hours writing the core sections (Sections 1-8)
- ~1.5 hours on the two advanced sections
- ~1 hour reviewing, checking for consistency, doing the self-check

That puts me at the upper end of the 4-8 hour estimate, which feels right for the level of detail I went for. A student who sticks to core requirements and is less obsessive about exact color codes could probably do it in 4-5 hours.

## Did the worked examples help?

**Hugely.** Without them, I would have had no idea what level of specificity to aim for. The first example (seat state) was the most directly useful because I could pattern-match it across all my seat states. The second example (booking flow step) helped me structure Section 4.

What made the examples effective was that they're *complete* -- they don't just show what to include, they show the *depth* expected. Hex colors, exact copy, transition descriptions. That calibration was essential.

One thing: the examples set such a high bar that I felt like I needed to maintain that level everywhere, which contributed to the length of my document. It might help to note that not every section needs to be *quite* as detailed as the example -- the examples represent peak specificity for the most complex dimensions.

## Did the guiding questions help?

Yes, the arrow questions were one of the most useful parts of the exercise. They didn't tell me what to write, but they forced me to think about specific aspects I might have skipped. Examples:

- "What does the user see first when the map loads?" -- I would have jumped straight into seat types without describing the overall first impression. This question made me write about the screen label, orientation cues, and the overall layout structure.
- "For each error: what exactly does the user see, and what can they do next?" -- This shaped my entire Section 7. Without it, I probably would have just said "an error message appears" without specifying the exact message, the visual treatment, and the next available action.
- "At what point in the flow does the user declare their needs?" -- This was the hardest guiding question and the most valuable. It's a genuine design decision, not just a detail to fill in.

The questions work because they're at the right level of abstraction. They don't say "use a modal" or "put it in step 1" -- they ask me to *think* about something and make a decision.

## Other observations

- The self-check section at the end was surprisingly useful. I went back and added more detail to my error cases after reading "Have you described what happens when things go wrong, not just the happy path?" It caught a gap I'd missed.

- The "AI prompt" framing is clever and genuinely made me write more precisely. Every time I was about to write something vague like "appropriate feedback is shown," I thought "an LLM would have no idea what to do with that" and forced myself to be specific.

- I appreciated that the exercise doesn't require mockups. Being able to focus purely on written specification felt appropriate for our skill level and forced me to be precise with words rather than relying on "see the wireframe."

- The seating plan image was essential. I can't imagine doing this exercise without a concrete venue to design for. Having the specific layout (wheelchair spaces in row A, premium in F-G, the aisle structure) made every decision feel grounded rather than abstract.

- One minor thing: the exercise says "Submit your UX design document as a single file (Markdown, PDF, or Word)." It might be worth specifying whether the file should include the self-check responses or not. I included them at the end of my document, but I wasn't sure if that was expected.
