/**
 * The portrait splash composition is retimed from `loopSeconds` in
 * content/home.ts, which has to stay equal to the Lottie's own loop length.
 * Re-export a Lottie and the two drift apart silently — the portrait frames
 * just start running at the wrong pace, which is how this broke before.
 *
 * Run: node scripts/check-splash-timing.mjs
 */
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const FRAMES = {
  coreServices: "public/core_services_animation.json",
  featuredProject: "public/featured_project_animation.json",
  industrySolutions: "public/industry_solutions_animation.json",
};

const home = readFileSync("src/content/home.ts", "utf8");

for (const [key, path] of Object.entries(FRAMES)) {
  const { fr, ip, op } = JSON.parse(readFileSync(path, "utf8"));
  const actual = Number(((op - ip) / fr).toFixed(3));

  const declared = Number(
    home.match(new RegExp(`${key}:.*?loopSeconds: ([\\d.]+)`))?.[1]
  );

  assert.equal(
    declared,
    actual,
    `${key}: home.ts says loopSeconds ${declared}, but ${path} loops in ${actual}s`
  );
  console.log(`ok  ${key}  ${actual}s`);
}
console.log("splash timing constants match their Lottie JSON");
