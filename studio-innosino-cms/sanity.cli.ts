import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'x3v92ipd',
    dataset: 'production'
  },
  /**
   * Where `sanity deploy` publishes the Studio. This is the address editors
   * log in at, so it is part of the setup rather than a per-machine choice.
   */
  studioHost: 'innosino-cms',

  deployment: {
    /** Pins which hosted application `sanity deploy` updates, so it never asks. */
    appId: 'q2f8x6a0uggau9ibzjp0ucfi',

    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
