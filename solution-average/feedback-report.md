# Exercise Feedback Report — Nina

## What parts of the exercise were confusing?

The biggest thing I wasn't sure about was the **level of detail** expected. The worked examples were really specific (exact hex colors, pixel sizes, specific wording for error messages), and I tried to match that, but it felt weird deciding things like exact colors when I'm not a designer. Like, how do I know if #2563EB is the right blue? I just picked colors that seemed reasonable, but I kept second-guessing myself.

Also, the relationship between **wheelchair spaces and companion seats** took me a while to understand. The business rule says "each wheelchair space must include at least one companion seat in the same booking" — but I wasn't sure if that means the system should auto-select a companion seat, or just block checkout until the user picks one, or what. I went with blocking checkout but I'm not confident that's the best UX.

The **"meta-level" thing** in the intro ("your design document is also an AI prompt") was interesting but I wasn't totally sure what to do with it. I just tried to be specific in my descriptions.

## What was easy to understand?

The **overall structure** was very clear. Having the 8 sections listed with descriptions made it easy to know what I needed to cover. I basically went through them one by one, which kept me organized.

The **venue facts table** was helpful — having all the numbers in one place (84 seats, rows A-H, prices, etc.) meant I didn't have to hunt for information.

The **booking flow** was pretty straightforward to think through because it's similar to other booking sites I've used (like for trains or concerts). So the general pattern of "pick a showing, pick seats, checkout, confirmation" came naturally.

## Where did I get stuck?

1. **Seat states**: I started with just "available" and "booked" and then realized there are way more states. The worked example showed "selected-by-current-user" which helped, but figuring out all the other states (disabled, held-but-expired, etc.) took time. I'm still not sure I got them all.

2. **Edge cases section**: This was the hardest part. I could think of the obvious ones (timeout, seat taken by someone else) but I feel like there are probably more that I'm missing. Like, what if the user opens two browser tabs? Or what if the server is slow? I didn't cover everything.

3. **Accessibility flow**: Deciding *when* to ask about wheelchair needs was tricky. I put it as a separate step before seat selection, but maybe it should be a toggle on the seat map screen? I went back and forth on this.

4. **How specific to be about layout**: Like, should I say "the seat map is 600px wide" or just "the seat map fills the main content area"? The worked examples gave pixel sizes for some things (like seat borders) but not for overall layout. I tried to give enough detail but I'm sure some parts are too vague.

## What would I change about the exercise to help students like me?

- **More worked examples** would be amazing. Two examples is good but having one for an error case or the accessibility flow would help me understand the expected depth for those trickier sections.
- **A checklist of seat states** to think about. I know the point is for us to figure them out, but a hint like "there are at least 5 distinct states" would help me know if I'm on the right track.
- Maybe **a short bad example** next to the good example? Showing "here's what's too vague" vs "here's what's specific enough" side by side would really drive the point home.
- The **time estimate of 4-8 hours** feels about right, maybe on the higher end for me. I think I'd spend around 6-7 hours on this in real life, including thinking time and going back to revise sections.

## How long do you think this would take you in real life?

Probably **6-7 hours** spread across two or three sittings. The first sitting would be reading the exercise and writing a rough draft (2-3 hours). Then I'd leave it overnight and come back to add details and fix things (2-3 hours). And then a final pass to check everything against the self-check questions (1 hour).

## Did the worked examples help? How?

**Yes, a lot.** The first example (seat state) showed me exactly how specific I needed to be — hex colors, border widths, what happens on error, transitions between states. Without that, I probably would have written something like "the selected seat turns blue" and thought that was enough.

The second example (booking flow step) was also useful because it showed a different kind of section (a flow step vs. a state), so I could see that the same level of detail is expected even for process descriptions, not just visual states.

I basically used both examples as templates and tried to match their structure for my own sections. It didn't always work perfectly (some of my sections are less detailed than the examples) but it gave me something to aim for.

## Did the guiding questions (arrows) help?

Yes, they were helpful as a starting point. The one that helped the most was under Seat States: "For each state: could a developer implement it from your description alone, without guessing colors, icons, or borders?" That kept me honest about being specific.

The one under Accessibility ("At what point in the flow does the user declare their needs?") made me actually think about where to put that step instead of just handwaving it.

However, I didn't always fully answer every guiding question. Some of them I kind of addressed indirectly but didn't explicitly answer. I think that's probably a weakness in my document.

## Any other observations

- I liked that the exercise is a **realistic scenario**. A cinema booking system is something I've actually used in real life, so I could draw on my own experience.
- The **self-check questions** at the end were a good reality check. When I asked myself "could a developer build this without messaging me?" I realized some of my sections were too thin and went back to add more detail. I still don't think my document is perfect but it's better than the first draft.
- I found it interesting that this exercise made me think about **what it's like to read a spec** from the developer's perspective. I've always been on the coding side, and writing the spec feels different — harder in some ways.
- I noticed I spent way more time on the **happy path** (normal seat selection, normal checkout) than on the edge cases. I think that's my biggest weakness in this document. The error section feels thinner than the rest.
- The **advanced requirements** are interesting but I didn't have time to tackle any of them. Responsive design would be the one I'd try first if I had more time.
