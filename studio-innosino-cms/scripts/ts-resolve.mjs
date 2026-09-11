/**
 * The app's content modules import each other without file extensions
 * ("./site"), which the TypeScript compiler resolves but Node's ESM loader
 * does not. Retry a failed relative specifier with .ts appended.
 */
export async function resolve(specifier, context, next) {
  try {
    return await next(specifier, context)
  } catch (error) {
    if (specifier.startsWith('.') && !/\.[cm]?[jt]s$/.test(specifier)) {
      return next(`${specifier}.ts`, context)
    }
    throw error
  }
}
