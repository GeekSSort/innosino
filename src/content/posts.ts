/**
 * Every blog post, body included.
 *
 * The index cards, the article pages, the sitemap and the JSON-LD all read
 * this one array, so a post cannot appear in a list the article does not back
 * — the failure the old setup had, where nine cards all linked to the same
 * hardcoded /blogs/details page.
 */

export interface PostSection {
  /** Anchor id, also the table-of-contents target. */
  id: string;
  heading: string;
  body: string[];
}

export interface Post {
  slug: string;
  /** Shown on the card and as the first hero pill. */
  category: string;
  /** Which filter pills on the index this post answers to. */
  filterTags: string[];
  /** ISO, so it sorts and feeds `datePublished` without being reparsed. */
  date: string;
  title: string;
  /** Card copy, hero standfirst and meta description — one sentence, reused. */
  excerpt: string;
  image: string;
  /** Pulled out mid-article, in the frame's quote style. */
  pullQuote?: string;
  sections: PostSection[];
}

/** Every post is bylined to the team. */
export const postAuthor = "Innosino Team";
export const postAuthorInitials = "IS";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Formatted here rather than with `toLocaleDateString`, which resolves against
 * whatever ICU data the runtime has: the server and the browser have to agree
 * on this string or React throws a hydration mismatch on every card.
 */
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/**
 * Derived from the body at 200 words a minute rather than stored, so it cannot
 * claim "5 min" on an article that has since doubled in length.
 */
export function readTime(post: Post): string {
  const words = post.sections.reduce(
    (total, section) =>
      total + section.body.join(" ").split(/\s+/).length + section.heading.split(/\s+/).length,
    0,
  );
  return `${Math.max(3, Math.round(words / 200))} min`;
}

export const posts: Post[] = [
  {
    slug: "inside-the-logic-ic-trainer-kit-16-profiles",
    category: "Embedded Systems",
    filterTags: ["All", "Featured Blogs", "Embedded Systems", "Firmware"],
    date: "2026-08-28",
    title: "Inside the Logic IC Trainer Kit's 16 Profiles",
    excerpt:
      "Why we chose a profile-based architecture over hardcoded logic families, and what it did to setup time and burnt chips in the lab.",
    image: "/blog_details assets/BD-01.webp",
    pullQuote:
      "Hardware should adapt to the learner. The learner should not have to adapt to the kit.",
    sections: [
      {
        id: "the-hardcoding-problem",
        heading: "The Hardcoding Problem",
        body: [
          "When we started the Logic IC Trainer Kit, the goal was a platform where students and embedded engineers could experiment with digital logic without the constant friction of fragile wiring, confusing pinouts and burnt integrated circuits. The obvious first design was the one every trainer board on the market ships: fix the socket to one logic family, silkscreen the pinout beside it, and let the learner wire the rest.",
          "That design fails on its second lesson. A 74HC00 and a 74HC74 do not share a pinout, so the moment the syllabus moves from gates to flip-flops the board is either wrong or the learner is rewiring power and ground by hand — which is exactly where the chips die. We counted the failures in one term of lab sessions and almost all of them were a supply pin landing on an input.",
        ],
      },
      {
        id: "the-profile-schema",
        heading: "The Profile Schema",
        body: [
          "A profile is a small record describing one IC: which socket pins are supply, which are inputs, which are outputs, and what the expected truth table is. The firmware reads that record and configures the level shifters, the pull networks and the display around it. Nothing about the board is specific to any one part.",
          "Keeping the schema declarative meant the truth table came along for free. Because the profile already states what each output should do for a given input vector, the board can compare what it measures against what it expects and say something useful when they differ — instead of leaving a learner to work out why an LED is dark.",
        ],
      },
      {
        id: "the-16-profiles",
        heading: "The 16 Profiles",
        body: [
          "We pre-loaded sixteen profiles covering the combinational and sequential parts a first course actually reaches: NAND and NOR clusters, XOR, dual D-type flip-flops, JK flip-flops, a 4-bit binary counter, shift registers and a handful of decoders. A rotary encoder selects between them and an OLED shows the active pinout.",
          "Sixteen was not a technical limit. It was the point at which adding another profile stopped changing what a learner could do in a two-hour session, and the menu was still short enough to scroll without hunting.",
        ],
      },
      {
        id: "real-time-visualization",
        heading: "Real-Time Visualization",
        body: [
          "Every gate input and output transition is buffered and rendered on a two-tier LED ring around the socket. The inner ring shows the state the profile expects; the outer shows what the pin is actually doing. When those disagree, the learner sees the disagreement rather than a dead output.",
          "Bus contention and invalid combinations flag the offending zone in amber without cutting system power. Killing the rails on a fault is safer for the chip and useless for teaching — the fault disappears the instant it becomes interesting.",
        ],
      },
      {
        id: "what-it-taught-us",
        heading: "What It Taught Us",
        body: [
          "Moving from fixed-function hardware to a profile-centric architecture cut setup time per experiment by roughly seventy percent and effectively ended accidental chip burnouts in lab sessions. The board stopped being a thing to survive and started being a thing to use.",
          "The principle generalised further than we expected. Describing the part in data and keeping the hardware generic is now how we approach test fixtures and bring-up rigs across the practice: one board, a table of parts, and firmware that reads the table.",
        ],
      },
    ],
  },
  {
    slug: "stack-up-choices-for-3-layer-sense-boards",
    category: "PCB Design",
    filterTags: ["All", "PCB Design", "Featured Blogs"],
    date: "2026-08-14",
    title: "Stack-Up Choices for Sensitive Sense Boards",
    excerpt:
      "How copper weight, spacing and shielding get chosen when a board has to carry microvolts next to a switching regulator.",
    image: "/homepage_assets/industries/Biomedical Electronics.webp",
    sections: [
      {
        id: "why-the-stack-up-comes-first",
        heading: "Why the Stack-Up Comes First",
        body: [
          "On a sense board the stack-up is not a manufacturing detail settled at the end — it is the first design decision, because it sets the impedance of every return path before a single track is drawn. Choose it late and layout becomes a negotiation with a geometry you already committed to.",
          "The question to answer first is where the quiet reference plane lives. Everything else — layer count, copper weight, dielectric thickness — follows from wanting an uninterrupted plane directly under the analogue section.",
        ],
      },
      {
        id: "two-layers-is-usually-a-false-economy",
        heading: "Two Layers Is Usually a False Economy",
        body: [
          "A two-layer board saves a few dollars per panel and spends them again in EMC rework. Without a dedicated plane, returns share copper with signals, and the loop area of a sense track grows to whatever the routing happened to leave.",
          "We move to four layers whenever the board carries both a switching supply and anything below a few millivolts. The extra cost is real but small; the alternative is discovering the coupling in a chamber, where every fix is a respin.",
        ],
      },
      {
        id: "copper-weight-and-spacing",
        heading: "Copper Weight and Spacing",
        body: [
          "One-ounce copper is the default and it is right most of the time. Heavier copper helps a power plane and hurts fine-pitch routing: etch factor grows, minimum spacing grows with it, and a 0.4mm BGA stops fanning out cleanly.",
          "Where a board carries both, the honest answer is to split the difference by layer — heavy copper on the power pair, one ounce on the signal pair — and to say so on the fabrication drawing rather than leaving the fabricator to guess.",
        ],
      },
      {
        id: "shielding-that-earns-its-place",
        heading: "Shielding That Earns Its Place",
        body: [
          "Guard rings and shield cans work, and both are frequently applied where a shorter track would have done more. A guard ring around a high-impedance node needs to be driven at the node's own potential to do anything about leakage; tied to ground it is mostly decoration.",
          "Before adding a can, check what it is shielding against. If the aggressor is on the same board, the fix is layout. A can only helps with fields arriving from outside the board — or leaving it.",
        ],
      },
      {
        id: "what-we-hand-the-fabricator",
        heading: "What We Hand the Fabricator",
        body: [
          "A stack-up drawing with named dielectrics and target thicknesses, impedance targets with a tolerance, and a note on which layers are plane. Anything left implicit will be substituted for something in stock, and the substitution will not be flagged.",
          "We also ask for the fabricator's own stack-up back before the build. Comparing what they propose against what was specified takes ten minutes and has caught a swapped prepreg more than once.",
        ],
      },
    ],
  },
  {
    slug: "debugging-cross-talk-in-dense-capacitive-arrays",
    category: "Firmware",
    filterTags: ["All", "Firmware", "Embedded Systems"],
    date: "2026-07-30",
    title: "Debugging Cross-Talk in Dense Capacitive Arrays",
    excerpt:
      "A practical walk-through of adaptive baseline filtering for closely packed touch zones, and how to tell coupling from drift.",
    image: "/blog_details assets/BD-02.webp",
    sections: [
      {
        id: "the-symptom",
        heading: "The Symptom",
        body: [
          "A neighbouring pad reports a touch that never happened. On a sparse keypad this is rare enough to ignore; on a dense array with 6mm pitch it happens constantly, and the usual first response — raising the threshold — trades phantom touches for missed ones.",
          "The useful first step is to stop looking at the decision and start looking at the raw counts. Log every channel at full rate through one deliberate touch and the shape of the problem is visible immediately.",
        ],
      },
      {
        id: "coupling-versus-drift",
        heading: "Coupling Versus Drift",
        body: [
          "Coupling and thermal drift look identical in a threshold crossing and nothing alike in a trace. Coupling appears and disappears with the aggressor, on the same sample; drift moves every channel together over seconds or minutes.",
          "Separating them matters because the fixes are opposite. Drift wants a slow baseline tracker. Coupling wants that tracker frozen, or it will quietly learn the aggressor's signature into the baseline and make the next real touch invisible.",
        ],
      },
      {
        id: "adaptive-baselines-that-know-when-to-stop",
        heading: "Adaptive Baselines That Know When to Stop",
        body: [
          "Our baseline filter is a slow first-order tracker with one rule: it stops updating on any channel whose neighbours are active. A touch on one pad holds the baseline still on the pads around it, so the array cannot adapt its way into a dead zone.",
          "The hold has to be released on a timeout as well as on release, or a stuck reading — a coin resting on a pad, a drop of water — freezes the baseline permanently and the array never recovers.",
        ],
      },
      {
        id: "layout-fixes-firmware-cannot-make",
        heading: "Layout Fixes Firmware Cannot Make",
        body: [
          "Some coupling is not the firmware's to solve. Pads with no ground between them, traces running side by side back to the controller, and an overlay thicker than the pad pitch all produce coupling no filter removes without also removing the signal.",
          "The test for this is simple: ground one pad in software and see whether its neighbour still moves. If it does, the coupling is physical and the next revision needs a hatch fill between pads or a shorter, separated route.",
        ],
      },
      {
        id: "verifying-the-fix",
        heading: "Verifying the Fix",
        body: [
          "We keep a scripted sweep that touches every pad in turn with a fixed probe and records the response on every other channel. The output is a matrix, and the fix is judged on the off-diagonal terms rather than on whether a person could use the panel.",
          "Running that sweep on every build takes two minutes and has caught a regression from a routing change that a human tester would have called fine.",
        ],
      },
    ],
  },
  {
    slug: "getting-ble-midi-latency-under-10ms",
    category: "Embedded Systems",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
    date: "2026-07-16",
    title: "Getting BLE MIDI Latency Under 10 ms",
    excerpt:
      "Notes from tuning connection intervals and packet scheduling until a wireless instrument stopped feeling wireless.",
    image: "/homepage_assets/featured_project_images/guitar.webp",
    pullQuote:
      "A player does not perceive latency as a number. They perceive it as the instrument not being theirs.",
    sections: [
      {
        id: "what-the-budget-actually-is",
        heading: "What the Budget Actually Is",
        body: [
          "Musicians notice added latency somewhere around ten milliseconds and are certain of it by twenty. That is the whole budget, and the radio is only one of the things spending it: sensing, debounce, the BLE stack, the host's own audio path.",
          "We start by writing the budget down and assigning each stage a number. Anything not on the list is assumed to cost nothing, and that assumption is what usually turns out to be wrong.",
        ],
      },
      {
        id: "connection-interval-is-the-lever",
        heading: "Connection Interval Is the Lever",
        body: [
          "BLE only carries data at connection events, so the connection interval sets the floor on latency regardless of how fast the firmware is. At the 15ms default, a note is already late before it reaches the radio.",
          "We request 7.5ms, the shortest the specification allows, and accept that some hosts will refuse. What matters is handling the refusal: a device that assumes its request was granted will schedule as though events are twice as frequent as they are.",
        ],
      },
      {
        id: "packing-notes-without-batching-them",
        heading: "Packing Notes Without Batching Them",
        body: [
          "The BLE MIDI encoding allows several messages in one packet with timestamps, which is efficient and, applied naively, ruinous. Holding a note back to travel with the next one adds a full interval of latency to save a packet nobody was short of.",
          "The rule we settled on is to send at the first event after a message exists, and to pack only what is already queued. Chords arrive together because they were played together, not because the firmware waited.",
        ],
      },
      {
        id: "jitter-matters-more-than-mean",
        heading: "Jitter Matters More Than Mean",
        body: [
          "A steady twelve milliseconds is more playable than a mean of eight that occasionally spikes to thirty. Players adapt to constant delay and cannot adapt to a moving one.",
          "So the measurement to optimise is the distribution, not the average. We log timestamps at the sensor and at the host and plot the spread; a long tail usually points at a supervision timeout renegotiation or at scanning activity on the host, not at the firmware.",
        ],
      },
      {
        id: "measuring-it-honestly",
        heading: "Measuring It Honestly",
        body: [
          "Firmware timestamps prove only what the firmware believes. The measurement that counts puts a scope on the sensor line and captures the host's audio output, and reports the distance between them.",
          "That test is what took our own numbers from a claimed eight milliseconds to a measured eight — the earlier figure had quietly omitted the host stack, which was contributing more than the radio.",
        ],
      },
    ],
  },
  {
    slug: "designing-for-emc-before-the-chamber",
    category: "PCB Design",
    filterTags: ["All", "PCB Design", "Industrial Automation"],
    date: "2026-07-02",
    title: "Designing for EMC Before the Chamber",
    excerpt:
      "Chamber time is expensive and late. Most of what it catches can be designed out weeks earlier, on paper.",
    image: "/homepage_assets/industries/Industrial Automation.webp",
    sections: [
      {
        id: "the-cost-of-finding-out-late",
        heading: "The Cost of Finding Out Late",
        body: [
          "A failed pre-compliance session costs a day of chamber time. A failed formal session costs the slot, the re-test and whatever the schedule was holding. Both are cheap next to the respin that follows if the fix is not a component change.",
          "The point of designing for EMC early is not to guarantee a pass. It is to guarantee that if you fail, the fix is a footprint you already left on the board.",
        ],
      },
      {
        id: "loop-area-is-the-whole-story",
        heading: "Loop Area Is the Whole Story",
        body: [
          "Radiated emissions scale with current, frequency and loop area. Two of those are the product's requirements. The third is entirely the layout engineer's, and it is where nearly every design either passes or does not.",
          "The switching regulator's input loop is the first place to look: the high-side switch, the input capacitor and the return. Keeping that loop small and on one layer is worth more than any amount of filtering added afterwards.",
        ],
      },
      {
        id: "leave-the-footprints",
        heading: "Leave the Footprints",
        body: [
          "Every cable entering or leaving the board gets a common-mode choke footprint and a pair of pads to ground, populated with zero-ohm links or left empty. They cost nothing on the bill of materials and they turn a failure into a component swap.",
          "The same applies to the clock lines and the supply feed to any connector. A fitted series resistor position lets you slow an edge on the bench in the moment you discover it is the aggressor.",
        ],
      },
      {
        id: "pre-compliance-on-the-bench",
        heading: "Pre-Compliance on the Bench",
        body: [
          "A near-field probe and a spectrum analyser will not give you a number that means anything to a test house, and they will tell you which corner of the board is radiating. That is the question worth answering before booking anything.",
          "We sweep the board with a probe at every stage of bring-up, and keep the traces. A change that lifts a peak by ten decibels is obvious when compared against last week and invisible in isolation.",
        ],
      },
      {
        id: "what-to-bring-to-the-chamber",
        heading: "What to Bring to the Chamber",
        body: [
          "A working unit, a spare, the cables the product actually ships with, and a small box of the parts you might need to fit: ferrites, capacitors of a few values, a choke or two. Chamber time is for measuring and for trying fixes, and only one of those is possible without the box.",
          "Bring the test plan agreed in advance as well. Deciding what constitutes a pass while standing in the chamber is how a marginal result becomes an argument.",
        ],
      },
    ],
  },
  {
    slug: "ota-updates-that-cannot-brick-a-board",
    category: "Firmware",
    filterTags: ["All", "Firmware", "IOT Devices"],
    date: "2026-06-18",
    title: "OTA Updates That Cannot Brick a Board",
    excerpt:
      "A dual-bank bootloader, a rollback that actually works, and the failure cases most update schemes never test.",
    image: "/homepage_assets/industries/Smart IOT.webp",
    sections: [
      {
        id: "the-failure-you-are-designing-against",
        heading: "The Failure You Are Designing Against",
        body: [
          "The interesting failure is not a corrupt image — a checksum catches that. It is losing power midway through the write, on a device someone has to physically retrieve. Every design decision in an update path should be judged against that moment.",
          "Which means the question is never 'did the update succeed' but 'what boots if it did not'. If the answer involves a technician and a screwdriver, the design is not finished.",
        ],
      },
      {
        id: "dual-bank-and-what-it-costs",
        heading: "Dual Bank and What It Costs",
        body: [
          "Two full application slots plus a bootloader is the cheapest reliable answer: write to the inactive bank, verify it whole, then flip a pointer. Power loss at any point leaves the running image untouched.",
          "It costs flash, and that cost is the whole reason teams talk themselves out of it. Deciding late is what makes it painful: doubling the flash on the first schematic is a part number, and doing it after firmware has grown into the space is a respin.",
        ],
      },
      {
        id: "verify-before-you-commit",
        heading: "Verify Before You Commit",
        body: [
          "Verification means reading the written bank back and checking a signature over it — not the signature the sender claimed, but one computed from the bytes now in flash. A write that reported success and landed wrong is a real failure mode on worn flash.",
          "The pointer flip that activates the new bank must be a single atomic write. If activation takes two writes, there is a state between them, and something will eventually stop there.",
        ],
      },
      {
        id: "rollback-that-is-tested",
        heading: "Rollback That Is Tested",
        body: [
          "A new image gets a probationary boot: it must reach the application and confirm itself before the bootloader marks it permanent. Fail to confirm and the next reset returns to the old bank.",
          "Most rollback paths are written and never exercised. Ours runs in CI — a build that deliberately hangs before confirming, on real hardware, checking the board comes back on the previous version.",
        ],
      },
      {
        id: "the-fleet-level-safeguards",
        heading: "The Fleet-Level Safeguards",
        body: [
          "Staged rollout to a small cohort first, with a health signal reported after the probationary boot, catches the update that passes on the bench and fails on the units in the field. Without staging, the first sign of a bad build is a fleet that has already taken it.",
          "And every device needs a way to be told to stop. A pause that reaches devices before they download is worth more than the fastest rollout.",
        ],
      },
    ],
  },
  {
    slug: "choosing-between-ble-wifi-and-lora",
    category: "IOT Devices",
    filterTags: ["All", "IOT Devices", "Embedded Systems"],
    date: "2026-06-04",
    title: "Choosing Between BLE, Wi-Fi and LoRa",
    excerpt:
      "The radio decision is usually made on familiarity. Here is the set of questions that should make it instead.",
    image: "/homepage_assets/industries/Wireless Communication.webp",
    sections: [
      {
        id: "start-from-the-power-budget",
        heading: "Start From the Power Budget",
        body: [
          "A device that must run two years on a coin cell has already chosen its radio, whatever anyone would prefer. Wi-Fi's association and keep-alive costs put it out of reach at that budget; BLE and LoRa remain.",
          "So the first number to establish is not throughput but the energy available per message. Divide the usable battery capacity by the number of messages over the product's life and the shortlist writes itself.",
        ],
      },
      {
        id: "then-the-topology",
        heading: "Then the Topology",
        body: [
          "BLE reaches a phone or a gateway in the same room. LoRa reaches a gateway kilometres away and expects little back. Wi-Fi reaches infrastructure someone else maintains, with credentials someone else changes.",
          "The awkward cases are the ones needing two: a sensor that talks LoRa to the network and BLE to a technician's phone for commissioning. That is a common and entirely reasonable answer, and it is much cheaper decided early than retrofitted.",
        ],
      },
      {
        id: "who-owns-the-network",
        heading: "Who Owns the Network",
        body: [
          "Wi-Fi means living on a network the customer controls: captive portals, rotating passwords, VLANs that block multicast, IT departments that will not open a port. None of that is a technical obstacle and all of it is a support cost.",
          "LoRaWAN means depending on a gateway and a network server — yours or an operator's. That is an operational commitment with a monthly cost attached, which belongs in the decision rather than in the first invoice.",
        ],
      },
      {
        id: "certification-and-modules",
        heading: "Certification and Modules",
        body: [
          "A pre-certified module costs more per unit and removes an entire class of schedule risk. For anything under a few tens of thousands of units, that trade is almost always worth taking.",
          "Designing the radio in discretely is the right answer at volume, and it brings full radiated testing, antenna tuning and a longer certification path with it. Choose it deliberately, not because a module looked expensive on a spreadsheet.",
        ],
      },
      {
        id: "prototype-the-link-first",
        heading: "Prototype the Link First",
        body: [
          "Before committing, we build the link and walk it around the actual site. Concrete, metal racking, lift shafts and water tanks do things to a link budget that no calculation predicts.",
          "A day of that work has changed the radio choice on more than one project, and it has never been the expensive part of the schedule.",
        ],
      },
    ],
  },
  {
    slug: "what-dfm-review-actually-catches",
    category: "PCB Design",
    filterTags: ["All", "PCB Design", "Industrial Automation"],
    date: "2026-05-21",
    title: "What a DFM Review Actually Catches",
    excerpt:
      "Design for manufacture is not a checklist run at the end. These are the findings that keep recurring, and when to look for them.",
    image: "/project_page/image1 of from bench to shell.webp",
    sections: [
      {
        id: "the-review-is-not-a-gate",
        heading: "The Review Is Not a Gate",
        body: [
          "Treating DFM as a sign-off at the end of layout guarantees the findings arrive when they are most expensive to act on. The useful version runs three times: at placement, at routing, and before release.",
          "At placement almost everything is still free to move. That is when component orientation, panel edges and test point access should be settled, not after every track is laid.",
        ],
      },
      {
        id: "the-recurring-findings",
        heading: "The Recurring Findings",
        body: [
          "Tall components shadowing a neighbour from the reflow profile. Thermal reliefs missing on a pad tied to a plane, so the joint never reaches temperature. Silkscreen under a pad, where it becomes a solder defect rather than a label.",
          "Then the assembly ones: parts too close to the board edge for the conveyor rails, no fiducials, polarity marks hidden under the part they mark. None of these are subtle and all of them ship regularly.",
        ],
      },
      {
        id: "test-access-is-a-design-input",
        heading: "Test Access Is a Design Input",
        body: [
          "If the board is going to be tested on a bed of nails, the test points are a design input, not an afterthought: one per net, on one side, on a grid, away from tall parts. Retrofitting them means moving tracks that were already fine.",
          "For low volumes a fixture may never be built, and the argument for test points is still strong — they are how a technician debugs the twentieth unit without a microscope and a scalpel.",
        ],
      },
      {
        id: "talk-to-the-assembler-early",
        heading: "Talk to the Assembler Early",
        body: [
          "Every assembly house has its own tolerances, preferred panel sizes and parts it would rather not place. Asking for those before layout costs one email and removes most of the findings that would otherwise come back.",
          "They will also tell you which of your chosen parts they cannot source this quarter, which is frequently the most valuable thing in the conversation.",
        ],
      },
      {
        id: "the-release-package",
        heading: "The Release Package",
        body: [
          "Gerbers, drill files, a fabrication drawing with the stack-up, a pick-and-place file, a bill of materials with manufacturer part numbers, and an assembly drawing showing polarity. Anything missing is a question, and every question is a day.",
          "We generate that package from the CAD project with a script so a release cannot contain last week's bill of materials next to this week's Gerbers.",
        ],
      },
    ],
  },
  {
    slug: "battery-life-maths-for-sensor-nodes",
    category: "Embedded Systems",
    filterTags: ["All", "Embedded Systems", "IOT Devices"],
    date: "2026-05-07",
    title: "Battery Life Maths for Sensor Nodes",
    excerpt:
      "Why the datasheet sleep current is never the number that matters, and how to build an estimate you can defend.",
    image: "/homepage_assets/industries/Renewable Energy.webp",
    sections: [
      {
        id: "the-number-everyone-quotes",
        heading: "The Number Everyone Quotes",
        body: [
          "Every low-power MCU datasheet leads with a sleep current in the hundreds of nanoamps, and that figure is real under the stated conditions: one particular retention mode, room temperature, nothing else on the board.",
          "The board is never nothing else. A regulator with a quiescent current of two microamps, a pull-up someone left across a switch and a sensor that does not truly sleep will together dominate a budget the MCU was supposed to define.",
        ],
      },
      {
        id: "build-the-budget-per-event",
        heading: "Build the Budget Per Event",
        body: [
          "The workable model is energy per event, not average current. Wake, sample, process, transmit, sleep — measure the charge consumed by one full cycle in microamp-hours, then multiply by the number of cycles in the product's life.",
          "Expressing it this way makes the trade-offs legible. Halving the reporting interval doubles the event count; adding a retry doubles the most expensive stage of it.",
        ],
      },
      {
        id: "measure-do-not-model",
        heading: "Measure, Do Not Model",
        body: [
          "A current probe with enough dynamic range to see nanoamps and amps in the same capture will show you things no model produces: a radio that stays on longer than the API suggests, a sensor whose startup is ten times its conversion, a bootloader spinning for a hundred milliseconds at every wake.",
          "That capture is the deliverable. We keep one per firmware release, because power regressions are silent and are found months later in the field.",
        ],
      },
      {
        id: "the-battery-is-not-its-label",
        heading: "The Battery Is Not Its Label",
        body: [
          "A coin cell rated 220mAh delivers that into a light continuous load at room temperature. Pulse it with a radio transmission and its internal resistance drops the terminal voltage; do it at minus ten degrees and the usable capacity may be half the label.",
          "Sizing the reservoir capacitor to carry the transmit pulse is what turns the label back into something like the truth, and it is cheaper than the next cell size up.",
        ],
      },
      {
        id: "state-the-assumptions",
        heading: "State the Assumptions",
        body: [
          "Any battery life claim should travel with the conditions that produced it: reporting interval, temperature, radio conditions, number of retries assumed. A figure without them is not a specification, it is marketing.",
          "We write the assumptions into the datasheet alongside the number. It makes the claim defensible, and it tells the customer which of their conditions will change it.",
        ],
      },
    ],
  },
  {
    slug: "bring-up-checklist-for-a-new-board",
    category: "Embedded Systems",
    filterTags: ["All", "Embedded Systems", "Firmware"],
    date: "2026-04-23",
    title: "A Bring-Up Checklist for a New Board",
    excerpt:
      "The order we power up a first article, and why every step exists to make the next failure easy to find.",
    image: "/blog_details assets/BD-03.webp",
    pullQuote:
      "Bring-up is not a test of the board. It is a search for the first place the board and the schematic disagree.",
    sections: [
      {
        id: "before-power",
        heading: "Before Power",
        body: [
          "Under a microscope first: orientation on every polarised part, obvious bridges, anything missing against the assembly drawing. Then a meter across every rail to ground, looking for the short that would otherwise turn the first power-up into a smoke test.",
          "It takes fifteen minutes and it has saved a board more than once. A reversed regulator found on the bench is a rework; found at power-up it takes the load with it.",
        ],
      },
      {
        id: "rails-in-order",
        heading: "Rails, In Order",
        body: [
          "Current-limited supply, set low, brought up while watching the current. A board that draws its expected idle current is telling you something useful; one that hits the limit at 0.5V is telling you something more useful still, before anything is damaged.",
          "Then each rail measured in sequence, with the sequencing checked against what the parts require. Rails that come up in the wrong order can leave a part latched in a state no amount of firmware will clear.",
        ],
      },
      {
        id: "clock-reset-debug",
        heading: "Clock, Reset, Debug",
        body: [
          "Three things decide whether bring-up is an afternoon or a week: the oscillator is running at the right frequency, reset releases cleanly, and the debugger connects. Nothing else is worth attempting until all three are true.",
          "A crystal that starts intermittently is the classic time sink here, because the board works most of the time. Check the drive level and the load capacitors against the crystal's actual specification rather than the reference design's.",
        ],
      },
      {
        id: "one-peripheral-at-a-time",
        heading: "One Peripheral at a Time",
        body: [
          "From there it is a sequence of the smallest possible programs: toggle a pin, blink an LED, read the device ID over each bus, exercise one sensor. Each proves one thing, and each is kept.",
          "Resisting the urge to flash the full application is the whole discipline. The application exercises forty things at once and tells you only that one of them is wrong.",
        ],
      },
      {
        id: "write-it-down-as-you-go",
        heading: "Write It Down as You Go",
        body: [
          "Every deviation from the schematic — a resistor changed, a link cut, a pin reassigned — goes into a bring-up log against the board's serial number. Two revisions later that log is the only record of why unit three behaves differently.",
          "The log also becomes the errata list for the next revision. Nothing else reliably survives the gap between bring-up and the respin.",
        ],
      },
    ],
  },
  {
    slug: "mmwave-presence-sensing-without-cameras",
    category: "IOT Devices",
    filterTags: ["All", "IOT Devices", "Embedded Systems"],
    date: "2026-04-09",
    title: "mmWave Presence Sensing Without Cameras",
    excerpt:
      "What 60GHz radar can and cannot tell you about a room, and why it beats a PIR sensor for occupancy.",
    image: "/homepage_assets/featured_project_images/ai.webp",
    sections: [
      {
        id: "why-not-a-pir",
        heading: "Why Not a PIR",
        body: [
          "A passive infrared sensor detects change, not presence. A person sitting still stops existing to it, which is why office lights go out on people at their desks and why PIR-based occupancy data undercounts every quiet room.",
          "mmWave radar measures range and micro-motion, and breathing is enough micro-motion to register. A still person remains detected, which is the entire reason to reach for it.",
        ],
      },
      {
        id: "what-the-sensor-returns",
        heading: "What the Sensor Returns",
        body: [
          "The raw output is a range-Doppler map: energy at each distance and each velocity. Presence, count and position are all inferences drawn from it, and each inference is a place where a design can be honest or optimistic.",
          "Range is reliable. Counting people is not, beyond small numbers in clear line of sight. A product that promises exact occupancy from one sensor in a furnished room is promising something the physics does not support.",
        ],
      },
      {
        id: "the-privacy-argument",
        heading: "The Privacy Argument",
        body: [
          "Radar is the reason this technique gets deployed in places a camera would never be permitted: bathrooms, bedrooms, medical spaces. The sensor cannot identify anyone, and the data leaving it is a handful of numbers.",
          "That property is worth protecting in the design. Keep the inference on the device and send the conclusion, not the range-Doppler frames — the moment raw frames leave the building, the privacy argument gets harder to make.",
        ],
      },
      {
        id: "mounting-changes-everything",
        heading: "Mounting Changes Everything",
        body: [
          "Ceiling mounting gives clean coverage of a defined footprint. Wall mounting gives range down a corridor and a blind spot beneath. Neither is wrong and the firmware's zone configuration has to know which it is.",
          "Watch what is behind the sensor too. Radar passes through plasterboard perfectly well, and a unit that reliably detects the person in the next room is a support call waiting to happen.",
        ],
      },
      {
        id: "tuning-against-real-rooms",
        heading: "Tuning Against Real Rooms",
        body: [
          "Ceiling fans, curtains near a vent and a swinging door all produce motion the sensor cannot distinguish from a person on signal alone. Rejecting them means learning the room: static clutter mapped at commissioning, periodic motion filtered by its regularity.",
          "We commission with a walk test recorded to file, so the thresholds are set against that room's data rather than against a bench.",
        ],
      },
    ],
  },
  {
    slug: "modbus-vs-mqtt-on-the-factory-floor",
    category: "Industrial Automation",
    filterTags: ["All", "Industrial Automation", "IOT Devices"],
    date: "2026-03-26",
    title: "Modbus vs MQTT on the Factory Floor",
    excerpt:
      "Two protocols solving different problems, routinely compared as though they were alternatives.",
    image: "/homepage_assets/industries/Industrial Automation.webp",
    sections: [
      {
        id: "they-are-not-competitors",
        heading: "They Are Not Competitors",
        body: [
          "Modbus is a register protocol: a master asks a device for the contents of an address and gets a number back. MQTT is a transport: a client publishes a message to a topic and a broker distributes it. Most real installations use both.",
          "The confusion arises because a gateway usually sits between them, and the argument about which to use is really an argument about where that gateway belongs.",
        ],
      },
      {
        id: "what-modbus-is-good-at",
        heading: "What Modbus Is Good At",
        body: [
          "It is thirty-five years old, implemented by every serious industrial device, deterministic on a serial line, and simple enough to debug with a protocol analyser and a datasheet. Those are not small virtues on a plant floor.",
          "Its weaknesses are equally clear: no security of any kind, polling only, and a register map that lives in a PDF rather than in the device. Nothing about a Modbus device is self-describing.",
        ],
      },
      {
        id: "what-mqtt-brings",
        heading: "What MQTT Brings",
        body: [
          "Publish-subscribe means a new consumer of data does not require a change at the device. TLS and per-client credentials are available and standard. Last-will messages make a disconnected device visible rather than silent.",
          "It also brings a broker to run, keep available and secure. That is a real operational commitment, and on a site with no IT presence it is the part that gets neglected.",
        ],
      },
      {
        id: "where-to-put-the-gateway",
        heading: "Where to Put the Gateway",
        body: [
          "Close to the devices. A gateway polling Modbus over a short serial run and publishing MQTT northbound keeps the fragile, insecure, latency-sensitive part of the system inside one cabinet.",
          "It is also where the register map should be turned into named, typed values. Publishing 'holding register 40012' to a cloud topic just moves the PDF dependency somewhere it is harder to find.",
        ],
      },
      {
        id: "the-part-people-skip",
        heading: "The Part People Skip",
        body: [
          "Buffering. A link to the broker will drop, and what the gateway does in that window decides whether the outage is an inconvenience or a hole in the data.",
          "Local storage with store-and-forward on reconnect is a day of work at design time and effectively impossible to add convincingly once the fleet is deployed.",
        ],
      },
    ],
  },
  {
    slug: "designing-test-fixtures-worth-building",
    category: "Industrial Automation",
    filterTags: ["All", "Industrial Automation", "PCB Design"],
    date: "2026-03-12",
    title: "Designing Test Fixtures Worth Building",
    excerpt:
      "A fixture that takes longer to use than a manual check will not be used. What that constraint implies for the design.",
    image: "/project_page/image2 of from bench to shell.webp",
    sections: [
      {
        id: "the-only-metric",
        heading: "The Only Metric",
        body: [
          "Seconds per unit, including loading and unloading. An operator with a hundred boards to test will route around anything slower than the alternative, and a fixture that is routed around has cost money and bought nothing.",
          "Design to that number from the start. It decides the clamping mechanism, the connector choice and how much the test is allowed to do.",
        ],
      },
      {
        id: "what-to-test-and-what-to-skip",
        heading: "What to Test, and What to Skip",
        body: [
          "Test what assembly can get wrong: shorts, opens, missing parts, wrong values where they matter, and the interfaces that leave the board. Do not re-test what the component manufacturer already guarantees.",
          "The temptation is to make the fixture a full functional validation. That belongs in design verification, on a handful of units, not on every board coming off the line.",
        ],
      },
      {
        id: "the-mechanics-decide-the-reliability",
        heading: "The Mechanics Decide the Reliability",
        body: [
          "Pogo pins wear, and a fixture with intermittent contact produces failures that are indistinguishable from real ones. That is worse than no fixture: it trains the operator to retest until a board passes.",
          "Spring-loaded pins with a known cycle rating, a replaceable pin plate and a documented service interval turn wear into maintenance rather than mystery.",
        ],
      },
      {
        id: "make-the-result-unambiguous",
        heading: "Make the Result Unambiguous",
        body: [
          "Two lights and a serial log. Pass and fail must be visible from arm's length, and the log must say which test failed with the measured value, because 'fail' alone sends the board to a debug bench with no starting point.",
          "Logging every result, pass included, is what later lets you see a parameter drifting across a batch before it starts failing.",
        ],
      },
      {
        id: "the-fixture-needs-a-self-test",
        heading: "The Fixture Needs a Self-Test",
        body: [
          "A known-good golden board and a known-bad one, run at the start of each shift. Without them, a fixture that has quietly broken will pass everything, and the first sign will be a return.",
          "This is the step everyone agrees with and nobody schedules. Build it into the fixture software as a prompt on power-up and it happens.",
        ],
      },
    ],
  },
  {
    slug: "picking-an-mcu-you-can-still-buy",
    category: "Embedded Systems",
    filterTags: ["All", "Embedded Systems", "Firmware"],
    date: "2026-02-26",
    title: "Picking an MCU You Can Still Buy in Two Years",
    excerpt:
      "Peripheral counts are the easy part of the selection. Availability, tooling and the exit plan are what decide it.",
    image: "/homepage_assets/industries/Consumer Electronics.webp",
    sections: [
      {
        id: "the-shortage-taught-the-wrong-lesson",
        heading: "The Shortage Taught the Wrong Lesson",
        body: [
          "The lesson many teams took from the last shortage was to buy inventory. The more useful one was to design so a substitution is possible: same core, same peripheral set, a family with several pin-compatible members at different flash sizes.",
          "A design that can move up a family member without a layout change has an answer when one part number goes to fifty-two weeks. A design pinned to one exact device has a schedule problem it cannot engineer around.",
        ],
      },
      {
        id: "read-the-lifecycle-not-the-launch",
        heading: "Read the Lifecycle, Not the Launch",
        body: [
          "Manufacturers publish longevity commitments, and they mean something. A part with a ten-year assurance programme behind it is a different proposition from the newest device in a line, however attractive its peripherals.",
          "Check what the vendor has done to comparable families in the past as well. Announced end-of-life on a part with a stated commitment is rare; quietly stopping the cheapest member of a family is not.",
        ],
      },
      {
        id: "the-toolchain-is-part-of-the-part",
        heading: "The Toolchain Is Part of the Part",
        body: [
          "A silicon vendor's IDE that only runs on one operating system, a compiler licence per seat, an SDK distributed as a zip with no version control — each of those is a tax paid on every day of the project.",
          "We weight heavily toward parts with a working GCC target, a CMake-friendly SDK and a debugger that OpenOCD understands. It sounds like a preference and it shows up in the schedule.",
        ],
      },
      {
        id: "leave-headroom",
        heading: "Leave Headroom",
        body: [
          "Choose the part that fits today's firmware and the project ends with a fight over kilobytes. Flash and RAM consumption grow through a project without exception — logging, an update path, a protocol stack that turned out to be needed.",
          "Fifty percent free at first prototype is about right. It sounds wasteful and costs cents; running out at validation costs a redesign.",
        ],
      },
      {
        id: "write-the-abstraction-you-need",
        heading: "Write the Abstraction You Need",
        body: [
          "A thin layer between the application and the vendor SDK — not a grand hardware abstraction, just the dozen functions the application actually calls — is what makes a substitution a week rather than a rewrite.",
          "It also makes the application testable on a host, which pays for the layer long before any part goes short.",
        ],
      },
    ],
  },
  {
    slug: "grounding-and-return-paths-in-mixed-signal-layout",
    category: "PCB Design",
    filterTags: ["All", "PCB Design", "Embedded Systems"],
    date: "2026-02-12",
    title: "Grounding and Return Paths in Mixed-Signal Layout",
    excerpt:
      "The split-plane advice most of us learned is wrong more often than it is right. What to do instead.",
    image: "/homepage_assets/industries/Engineering Education.webp",
    pullQuote:
      "Current returns under its own track. Everything else about grounding follows from taking that seriously.",
    sections: [
      {
        id: "the-advice-that-wont-die",
        heading: "The Advice That Won't Die",
        body: [
          "Split the ground plane into analogue and digital and join them at one point: it is in every application note from the 1990s and it is the wrong default. A split plane forces any signal crossing it to find a return path the long way round, which is precisely the coupling the split was meant to prevent.",
          "The advice made sense for a specific case — a converter with separate ground pins, low frequencies, a single crossing point under the part. Applied generally to a modern mixed-signal board it does harm.",
        ],
      },
      {
        id: "what-current-actually-does",
        heading: "What Current Actually Does",
        body: [
          "Above a few hundred kilohertz, return current does not spread across the plane looking for the lowest resistance. It runs directly beneath the outgoing track, because that is the path of lowest inductance.",
          "Once you believe that, layout becomes simpler. Keep an unbroken plane under every fast signal, and the return takes care of itself. Break the plane and you have created a loop whose area you did not choose.",
        ],
      },
      {
        id: "partition-by-placement",
        heading: "Partition by Placement",
        body: [
          "The separation that works is physical, not a slot in the copper. Put the analogue section in one area, the digital in another, the switching supply in a third, and route so no digital track passes over the analogue region.",
          "One continuous plane underneath all of them. The partitioning happens in where the currents flow, which is set by where the parts are.",
        ],
      },
      {
        id: "the-converter-question",
        heading: "The Converter Question",
        body: [
          "Modern data converters ship with a recommended layout in the datasheet, and it is usually a single plane with a careful placement around the part. Follow it. The manufacturer characterised the device on that layout.",
          "Where a part genuinely wants separate grounds it says so explicitly and specifies the join. That is a specific instruction about a specific device, not a principle to generalise.",
        ],
      },
      {
        id: "check-the-crossings",
        heading: "Check the Crossings",
        body: [
          "Before release, walk every fast net and confirm the plane beneath it is continuous end to end. Connector cut-outs, mounting holes and dense via fields all create slots nobody drew deliberately.",
          "Most CAD tools will not flag this. It is a visual check, it takes twenty minutes, and it catches the problem that would otherwise be diagnosed in a chamber.",
        ],
      },
    ],
  },
  {
    slug: "rtos-or-superloop",
    category: "Firmware",
    filterTags: ["All", "Firmware", "Embedded Systems"],
    date: "2026-01-29",
    title: "RTOS or Superloop",
    excerpt:
      "A scheduler is not a maturity marker. The decision comes down to how many independent deadlines the product has.",
    image: "/blog_assets/B-01.webp",
    sections: [
      {
        id: "the-question-behind-the-question",
        heading: "The Question Behind the Question",
        body: [
          "Teams usually ask whether to use an RTOS when what they mean is whether the firmware is getting too complicated to reason about. Those are different questions, and adding a scheduler to a tangled design produces a tangled design with race conditions.",
          "The honest test is the number of independent deadlines. One control loop and some housekeeping is a superloop. Three subsystems each with their own timing requirement, one of which can block, is a scheduler.",
        ],
      },
      {
        id: "what-a-superloop-does-well",
        heading: "What a Superloop Does Well",
        body: [
          "It is fully deterministic and entirely inspectable. There is one stack, no preemption and no priority inversion, and the whole control flow can be read top to bottom by someone who has never seen the project.",
          "With a small state machine per subsystem and a time-sliced dispatch, it scales further than its reputation suggests — well past the point at which teams reach for an RTOS out of habit.",
        ],
      },
      {
        id: "what-it-costs-you",
        heading: "What It Costs You",
        body: [
          "Any blocking call becomes a hazard, because it stalls everything. Long operations have to be broken into steps that return, and code written that way is harder to read than the straight-line version an RTOS would allow.",
          "Third-party libraries are the sharp edge. A vendor stack that expects to block on a socket read does not fit into a superloop without a wrapper nobody wants to maintain.",
        ],
      },
      {
        id: "when-the-rtos-earns-it",
        heading: "When the RTOS Earns It",
        body: [
          "Blocking APIs you do not control, several genuinely independent timing domains, or a communications stack with its own thread requirements. In those cases the scheduler is not overhead, it is the thing making the design possible.",
          "Budget for it properly: per-task stacks, a tick, and the discipline of thinking about priorities and about what may be called from an interrupt. An RTOS adopted casually costs more than it saves.",
        ],
      },
      {
        id: "the-middle-ground",
        heading: "The Middle Ground",
        body: [
          "An event queue with a single dispatch loop covers a surprising amount of the space between the two. Interrupts post events, the loop drains them, and the ordering is explicit without any preemption to reason about.",
          "It is our default starting point on new firmware. Moving from there to a full scheduler later is straightforward; unpicking an unnecessary one is not.",
        ],
      },
    ],
  },
  {
    slug: "from-prototype-to-pilot-run-what-changes",
    category: "Industrial Automation",
    filterTags: ["All", "Industrial Automation", "PCB Design"],
    date: "2026-01-15",
    title: "From Prototype to Pilot Run: What Changes",
    excerpt:
      "The first fifty units break assumptions the first five never touched. Here is what to expect and what to prepare.",
    image: "/homepage_assets/featured_project_images/blue and black image.webp",
    sections: [
      {
        id: "hand-assembly-hid-the-problems",
        heading: "Hand Assembly Hid the Problems",
        body: [
          "Five prototypes are built by someone who knows the board, correcting as they go: a part rotated, a value substituted, a link added. None of that reaches the documentation, and all of it is load-bearing.",
          "At fifty units built by someone following the files, every one of those silent corrections becomes a defect. The first pilot run is mostly a test of the release package, not of the design.",
        ],
      },
      {
        id: "the-bill-of-materials-becomes-real",
        heading: "The Bill of Materials Becomes Real",
        body: [
          "Prototype parts came from a drawer or a distributor's single-unit stock. At pilot volume, minimum order quantities, packaging format and lead times all apply, and a part that was available in ones may not exist in reels.",
          "Approved alternates matter here. A bill of materials naming one manufacturer part per line with no acceptable substitutes will stop the build over a passive.",
        ],
      },
      {
        id: "yield-tells-you-what-to-fix",
        heading: "Yield Tells You What to Fix",
        body: [
          "Fifty units is enough to see a pattern and too few to see a rare one. What it reliably surfaces is systematic failure: a footprint marginal for the placement machine, a joint that never reflows properly, a connector that fails on insertion.",
          "Record every failure against a serial number and a test step. The distribution is the design feedback; the individual repairs are not.",
        ],
      },
      {
        id: "the-enclosure-arrives",
        heading: "The Enclosure Arrives",
        body: [
          "Tolerance stack-up between board, mounting bosses and moulded parts is theoretical until fifty of each exist. Boards that fitted the printed prototype rub against a moulded rib, and a connector sits half a millimetre proud of its cut-out.",
          "Build the first pilot boards into first-article enclosures deliberately, and measure rather than assume. It is the cheapest opportunity to move a hole.",
        ],
      },
      {
        id: "what-to-lock-before-you-scale",
        heading: "What to Lock Before You Scale",
        body: [
          "A released, versioned design package. A test fixture with recorded results. An assembly work instruction someone outside the team can follow. A firmware version with a build number visible on the device.",
          "Scaling without those does not fail immediately, which is the trap. It fails at the volume where diagnosing it costs the most.",
        ],
      },
    ],
  },
  {
    slug: "secure-provisioning-for-connected-devices",
    category: "IOT Devices",
    filterTags: ["All", "IOT Devices", "Firmware"],
    date: "2025-12-18",
    title: "Secure Provisioning for Connected Devices",
    excerpt:
      "Getting a unique identity onto every device without shipping a shared secret, and without slowing the line.",
    image: "/homepage_assets/industries/NFC and RFID Technology.webp",
    sections: [
      {
        id: "the-shared-secret-trap",
        heading: "The Shared Secret Trap",
        body: [
          "The fastest thing to build is one credential in the firmware image, identical on every unit. It works, it ships, and the day somebody extracts it from a single device the entire fleet is compromised at once.",
          "Nothing about that risk is hypothetical: firmware comes off a flash chip with a clip and a reader. Assume any secret in a shipped image is public.",
        ],
      },
      {
        id: "identity-per-device",
        heading: "Identity Per Device",
        body: [
          "Every unit needs a key that only it holds. The strongest version generates the private key on the device, inside a secure element, so it never exists anywhere else — the device produces a certificate signing request and the factory signs it.",
          "Where a secure element is not justified, injecting a unique key at test is still far better than a shared one. It bounds the damage of an extraction to a single device.",
        ],
      },
      {
        id: "what-the-factory-has-to-do",
        heading: "What the Factory Has to Do",
        body: [
          "Provisioning has to fit into the seconds-per-unit budget the test fixture already has, and it has to work without giving the contract manufacturer anything worth stealing. A signing service reachable from the fixture, holding the CA key off-site, achieves both.",
          "The fixture records which serial number received which certificate. That record is the fleet inventory, and reconstructing it later is not possible.",
        ],
      },
      {
        id: "rotation-and-revocation",
        heading: "Rotation and Revocation",
        body: [
          "Certificates expire, and a fleet with a ten-year life will outlive its first ones. A device with no renewal path becomes unmanageable on a date somebody chose casually years earlier.",
          "Revocation needs a plan too: a way to tell the backend that a particular device identity is no longer trusted, and a device-side behaviour when that happens that is not simply bricking.",
        ],
      },
      {
        id: "test-the-hostile-cases",
        heading: "Test the Hostile Cases",
        body: [
          "A device presented with a valid certificate for a different device. An expired one. A backend certificate signed by the wrong authority. Each should fail closed, and each should be in the test suite.",
          "Most provisioning implementations are tested only on the happy path, which proves that the good case works and nothing at all about the cases that matter.",
        ],
      },
    ],
  },
  {
    slug: "thermal-design-for-enclosed-electronics",
    category: "PCB Design",
    filterTags: ["All", "PCB Design", "Industrial Automation"],
    date: "2025-12-04",
    title: "Thermal Design for Enclosed Electronics",
    excerpt:
      "A sealed box has no airflow. What that means for copper, component placement and the numbers you quote.",
    image: "/blog_assets/B-02.webp",
    sections: [
      {
        id: "the-enclosure-is-the-heatsink",
        heading: "The Enclosure Is the Heatsink",
        body: [
          "In a sealed IP-rated box, every watt leaves through the walls. Internal airflow moves heat around but removes none of it, so the design problem is getting heat from the die to the enclosure, and from the enclosure to the outside.",
          "That reframes the usual instinct. A larger copper pour helps only if it is thermally connected to something that reaches the wall; otherwise it spreads the temperature rise across the board without lowering it.",
        ],
      },
      {
        id: "copper-as-a-thermal-path",
        heading: "Copper as a Thermal Path",
        body: [
          "Thermal vias under a power part into an internal plane are the cheapest improvement available, and their effectiveness depends on plating thickness and count rather than on drawing a grid that looks generous.",
          "A plane that is also carrying current is doing two jobs. Check both: a pour sized for thermal spreading may be interrupted by exactly the split that the power routing needed.",
        ],
      },
      {
        id: "placement-before-mitigation",
        heading: "Placement Before Mitigation",
        body: [
          "Hot parts near the wall they will dump into, temperature-sensitive parts as far from them as the board allows. An oscillator or a precision reference beside a regulator will read the regulator's duty cycle as drift.",
          "This is free at placement and impossible afterwards. It is also the step most often skipped, because at placement the thermal question does not feel urgent yet.",
        ],
      },
      {
        id: "measure-in-the-box",
        heading: "Measure in the Box",
        body: [
          "Bench measurements on an open board are optimistic by a wide margin. The number that matters is a thermocouple on the hottest junction with the lid on, at the top of the rated ambient range, running the worst-case load.",
          "Thermal camera images of an open board are useful for finding where the heat is and useless for deciding whether the design passes.",
        ],
      },
      {
        id: "derate-and-say-so",
        heading: "Derate, and Say So",
        body: [
          "Electrolytic capacitor life halves for every ten degrees. A design that runs comfortably at twenty-five degrees ambient and is specified to fifty-five has a service life that depends entirely on which of those it sees.",
          "State the rated ambient on the datasheet along with any derating above it. A product used outside its thermal assumptions fails in the field, and the assumption is only enforceable if it was published.",
        ],
      },
    ],
  },
  {
    slug: "reading-a-datasheet-like-an-engineer",
    category: "Embedded Systems",
    filterTags: ["All", "Embedded Systems", "PCB Design"],
    date: "2025-11-20",
    title: "Reading a Datasheet Like an Engineer",
    excerpt:
      "The front page is marketing. The parts that decide whether your design works are further in, and easy to skim past.",
    image: "/homepage_assets/industries/Digital Musical Instruments.webp",
    sections: [
      {
        id: "start-at-the-back",
        heading: "Start at the Back",
        body: [
          "The first page exists to get the part onto a shortlist. The absolute maximum ratings, the recommended operating conditions and the electrical characteristics table decide whether it belongs there, and they are usually several pages in.",
          "Absolute maximums are damage thresholds, not operating limits. A part run at its absolute maximum is not out of specification, it is out of warranty and probably out of life.",
        ],
      },
      {
        id: "read-the-conditions-column",
        heading: "Read the Conditions Column",
        body: [
          "Every number in a characteristics table is measured under stated conditions, and the conditions are where the story is. A quiescent current quoted at 25°C with no load says nothing about the same part at 85°C driving something.",
          "Watch for figures marked typical with no minimum or maximum. Typical is not a guarantee; it is what the characterisation lot did, and designing to it means designing to a distribution you cannot see.",
        ],
      },
      {
        id: "the-graphs-carry-the-truth",
        heading: "The Graphs Carry the Truth",
        body: [
          "Curves show what the tables cannot: how a parameter moves with temperature, supply and load. A ceramic capacitor's DC bias curve is the standard example — a 10µF part at its rated voltage may deliver a fraction of its nominal value.",
          "Where a table gives one number and a graph shows a slope, the graph is the more useful document.",
        ],
      },
      {
        id: "errata-are-part-of-the-datasheet",
        heading: "Errata Are Part of the Datasheet",
        body: [
          "Silicon errata live in a separate document, are revised independently, and routinely contain the reason your peripheral does not behave as described. Find them before writing the driver, not while debugging it.",
          "Check the revision of the part you actually have, too. Errata are fixed across silicon revisions, and a workaround for revision A can be a bug on revision C.",
        ],
      },
      {
        id: "the-reference-design-is-an-input",
        heading: "The Reference Design Is an Input",
        body: [
          "A reference design is a working example under the manufacturer's assumptions, not a schematic to copy without reading. Its component choices reflect a cost target and an application that may not be yours.",
          "Where you diverge from it, write down why. That note is what a reviewer needs, and it is what stops the divergence being quietly reverted two revisions later.",
        ],
      },
    ],
  },
];

/** The post the index features above the grid: always the newest one. */
export const featuredPost = () => sortedPosts()[0];

/** Newest first. */
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export const postSlugs = () => posts.map((post) => post.slug);

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

/** Three more to read: same category first, then whatever is newest. */
export function relatedPosts(post: Post, count = 3): Post[] {
  const others = sortedPosts().filter((other) => other.slug !== post.slug);
  const sameCategory = others.filter((other) => other.category === post.category);
  return [...sameCategory, ...others.filter((o) => o.category !== post.category)].slice(
    0,
    count,
  );
}
