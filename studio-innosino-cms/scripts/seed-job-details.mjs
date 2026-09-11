/**
 * Fills the job openings with placeholder detail so the pages can be seen
 * working before real hiring copy exists.
 *
 * This is sample content, not approved job specs. It is written to match the
 * roles' existing summaries and the work the site describes elsewhere, but it
 * says nothing about salary, visa status, reporting lines or start dates,
 * because inventing any of those on a live advert would be worse than leaving
 * the section empty.
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {homedir} from 'node:os'

const token = JSON.parse(
  readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'),
).authToken
const client = createClient({
  projectId: 'x3v92ipd', dataset: 'production',
  apiVersion: '2026-09-11', token, useCdn: false,
})

let n = 0
const key = () => `k${(n++).toString(36)}${Math.random().toString(36).slice(2, 7)}`
const para = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{_type: 'span', _key: key(), text, marks: []}],
})

const DETAILS = {
  'embedded-firmware-engineer': {
    intro: [
      'You would own firmware on boards we design ourselves, which means the schematic author sits across the bench from you and a question about a pull-up is answered in a minute rather than a sprint.',
      'Most of our work is battery-powered and wireless, so the interesting problems are power budgets, radio timing and the failure modes that only appear on the twentieth unit.',
    ],
    responsibilities: [
      'Write and maintain C for ARM Cortex-M targets, on bare metal and under an RTOS.',
      'Bring up new boards: first power-on, clocks, peripherals, and the bisect when one of them does not come up.',
      'Own a BLE or Wi-Fi stack integration end to end, including the provisioning flow.',
      'Build the OTA path and prove the rollback works before it ships.',
      'Measure power draw against the budget and argue for the design changes that hold it.',
    ],
    requirements: [
      'Three or more years writing embedded C for production hardware.',
      'Comfortable with a scope and a logic analyser as debugging tools, not last resorts.',
      'Have read a datasheet end to end and found the erratum that explained the bug.',
      'Familiar with at least one RTOS, and able to say when a superloop is the better answer.',
    ],
    niceToHave: [
      'Shipped a device through EMC certification.',
      'Experience with secure boot or device provisioning at volume.',
      'Rust on embedded targets.',
    ],
  },
  'hardware-and-pcb-design-engineer': {
    intro: [
      'You would take boards from a requirement to a package a contract manufacturer can build from, with the firmware engineer who has to bring the board up reviewing your schematic before it goes out.',
    ],
    responsibilities: [
      'Capture schematics and select components against real cost and availability, not just the ideal part.',
      'Lay out multilayer boards with impedance, thermal and EMI considerations planned before routing starts.',
      'Run DFM and DFA reviews against the assembly tolerances of the line that will actually build it.',
      'Support bring-up and rework on first articles, and fold what you learn into the next revision.',
    ],
    requirements: [
      'Three or more years of schematic capture and multilayer PCB layout on shipped products.',
      'Fluent in at least one professional EDA tool — Altium, KiCad or equivalent.',
      'Understand stack-up, return paths and grounding well enough to defend a choice.',
      'Have handed a design package to a manufacturer and answered their questions.',
    ],
    niceToHave: [
      'High-speed digital or RF layout experience.',
      'Mixed-signal boards where microvolts sit next to switching regulators.',
      'Familiarity with IPC class 2 and 3 requirements.',
    ],
  },
  'iot-backend-and-cloud-engineer': {
    intro: [
      'This is the half of the product that is not on the bench: the APIs, pipelines and dashboards that a fleet of our devices talks to once it leaves the building.',
      'The role is remote, and the hardware teams are not — so writing things down clearly matters as much as the code.',
    ],
    responsibilities: [
      'Design and run device APIs, from first provisioning through to live control.',
      'Build telemetry pipelines that stay honest when a few thousand devices report at once.',
      'Own the dashboards the hardware team uses to see what a fleet is actually doing.',
      'Work with firmware on the protocol, so the device side and the server side are designed together.',
    ],
    requirements: [
      'Three or more years building and operating backend services in production.',
      'Comfortable with MQTT, or with another device protocol and willing to learn this one.',
      'Have run something you built, not only shipped it — you know what its 3am failure looks like.',
      'Able to work with people eight time zones away without waiting on a call to make progress.',
    ],
    niceToHave: [
      'Time-series storage at scale.',
      'Device fleet management or OTA orchestration.',
      'Edge compute, or anything that has taught you what unreliable connectivity does to assumptions.',
    ],
  },
  'test-and-validation-engineer': {
    intro: [
      'You would build the evidence that a design holds — the fixtures, the scripts and the environmental runs that find a problem while it is still cheap.',
    ],
    responsibilities: [
      'Design and build test fixtures worth the bench space they take.',
      'Automate bring-up and functional test so a board is checked the same way every time.',
      'Run environmental and stress testing against the product’s real operating conditions.',
      'Write up failures so the fix is obvious to whoever has to make it.',
    ],
    requirements: [
      'Two or more years in hardware test, validation or manufacturing engineering.',
      'Scripting in Python or similar, enough to automate an instrument and parse what it returns.',
      'Comfortable with lab instruments: supplies, scopes, chambers, and their limits.',
      'The temperament to keep going after the twelfth passing run.',
    ],
    niceToHave: [
      'EMC pre-compliance experience.',
      'HALT or HASS programmes.',
      'Built a fixture that outlived the product it was made for.',
    ],
  },
  'manufacturing-support-engineer': {
    intro: [
      'You would sit between the design bench and the line, based in Shenzhen, close to the suppliers and the assembly houses that actually build what we draw.',
    ],
    responsibilities: [
      'Run pilot builds and feed what goes wrong back into the design.',
      'Analyse yield, find the real cause of a drop, and close it out with the supplier.',
      'Qualify suppliers and keep a BOM buildable as parts go in and out of stock.',
      'Own the documentation package the line builds from.',
    ],
    requirements: [
      'Three or more years in manufacturing, NPI or supplier quality for electronics.',
      'Read a BOM and an assembly drawing the way a line operator will read them.',
      'Have taken a product from prototype through pilot into volume at least once.',
      'Working Mandarin for the factory floor.',
    ],
    niceToHave: [
      'SMT process knowledge, including reflow profiling.',
      'Experience with test coverage decisions — ICT, flying probe, functional.',
      'Have moved a product between contract manufacturers and survived it.',
    ],
  },
  'engineering-intern': {
    intro: [
      'Six months with your own piece of work — not shadowing, and not fetching. You would have a scope, a reviewer, and something on a bench with your name against it.',
    ],
    responsibilities: [
      'Take a subsystem on a live project and carry it from brief to something that works.',
      'Sit in design reviews and be expected to have an opinion.',
      'Write down what you did well enough that the next person can pick it up.',
    ],
    requirements: [
      'Studying electronics, embedded systems, computer engineering or similar.',
      'Have built something outside coursework — a board, a firmware project, a robot that mostly works.',
      'Available for six months, based in Shanghai.',
    ],
    niceToHave: [
      'C or Python beyond a first course.',
      'Any hands-on soldering, or a KiCad project you can show us.',
    ],
  },
}

const roles = await client.fetch('*[_type == "openRole"]{_id, title, "slug": slug.current}')
let tx = client.transaction()
let matched = 0
for (const r of roles) {
  const d = DETAILS[r.slug]
  if (!d) {
    console.log(`  no sample content for "${r.slug}" — left empty`)
    continue
  }
  matched += 1
  tx = tx.patch(r._id, (p) =>
    p.set({
      intro: d.intro.map(para),
      responsibilities: d.responsibilities,
      requirements: d.requirements,
      niceToHave: d.niceToHave,
    }),
  )
  console.log(`  ${r.title}: ${d.responsibilities.length} duties, ${d.requirements.length} requirements`)
}
await tx.commit()
console.log(`\nSeeded ${matched}/${roles.length} job openings with placeholder detail.`)
