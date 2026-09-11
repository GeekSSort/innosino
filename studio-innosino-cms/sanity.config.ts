import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, SINGLETON_TYPES} from './schemaTypes'
import {structure} from './structure'

const SINGLETONS: ReadonlySet<string> = new Set<string>(SINGLETON_TYPES)

export default defineConfig({
  name: 'default',
  title: 'INNOSINO CMS',

  projectId: 'x3v92ipd',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    /**
     * Pages are one document each, reached through Structure. Dropping their
     * initial-value templates keeps them out of the global "create new" menu,
     * where a second Home page could be made that nothing would ever render.
     */
    templates: (prev) => prev.filter((template) => !SINGLETONS.has(template.schemaType)),
  },

  document: {
    /** Same reason: a page singleton can be edited, but not created or deleted. */
    actions: (prev, {schemaType}) =>
      SINGLETONS.has(schemaType)
        ? prev.filter(({action}) => action && !['duplicate', 'delete', 'unpublish'].includes(action))
        : prev,
  },
})
