/**
 * Imports src/content/projectDetail.ts as the projectDetailPage singleton.
 *
 * Separate from migrate.mjs because that script reads content modules the
 * frontend migration has since deleted; this one touches a single file that
 * still exists. The Figma-extracted keys ("theVideoCardIs", "a4000Year") are
 * dropped or recombined here — several were layout annotations sitting in JSX
 * comments, never rendered.
 */
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {homedir} from 'node:os'

const token = JSON.parse(
  readFileSync(join(homedir(), '.config', 'sanity', 'config.json'), 'utf8'),
).authToken
if (!token) throw new Error('No authToken. Run: npx sanity login')

const client = createClient({
  projectId: 'x3v92ipd',
  dataset: 'production',
  apiVersion: '2026-09-11',
  token,
  useCdn: false,
})

const {projectDetail: d} = await import(
  '/Users/sirajul/innosino/src/content/projectDetail.ts'
)

await client.createOrReplace({
  _id: 'projectDetailPage',
  _type: 'projectDetailPage',
  hero: {
    _type: 'pageHero',
    breadcrumb: 'PROJECTS',
    heading: {_type: 'splitHeading', lead: 'POLYPAN ELECTRONIC HANDPAN', accent: ''},
    /* Three source keys were one sentence broken at the line lengths of the
       original design. Rejoined, so the copy reflows instead of hard-wrapping. */
    subtitle: [d.anIntelligentElectronicHandpan, d.touchSensingGestureControl, d.a4000Year]
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim(),
  },
  heroVideo: '/project_page/Project Details_first card video.mp4',
  sectionsHeading: d.whatShippedFromBench,
  overviewIntro: d.thePolypanIsAn,
  architectureNote: d.weDevelopedAnIntegrated,
  specsLede: d.comprehensiveBreakdownOfHardware,
  signalPathLede: d.fromTheMomentA,
  signalPathSteps: [d.touchLayer, d.signalFiltering, d.mcuFirmwareDsp, d.gestureSensing],
  timelineLede: d.theEndToEnd,
  timelineSteps: [
    d.architectureFeasibility,
    d.electronicsPcbV1,
    d.caseCadErgonomics,
    d.firmwareTouchTuning,
    d.bomOptimizationTesting,
    d.pilotRunMassMfg,
  ],
  cta: {
    _type: 'ctaBanner',
    title: d.haveAHardwareIdea,
    body: d.tellUsWhatYou,
    action: {_type: 'link', label: 'Book a Call', href: '/contact'},
  },
})

console.log('projectDetailPage written.')
