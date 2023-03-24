import { readFile } from 'fs/promises'
import { join, parse } from 'path'

import chalk from 'chalk'
import PluginError from 'plugin-error'
import postcss from 'postcss'
// eslint-disable-next-line import/default
import postcssrc from 'postcss-load-config'
import { compileAsync } from 'sass-embedded'

import { paths } from '../config/index.js'
import { getListing } from '../lib/file-helper.js'

import { assets } from './index.mjs'

/**
 * Compile Sass to CSS task
 *
 * @param {string} pattern - Minimatch pattern
 * @param {AssetEntry[1]} [options] - Asset options
 * @returns {() => Promise<void>} Prepared compile task
 */
export function compile (pattern, options) {
  const task = async () => {
    const modulePaths = await getListing(options.srcPath, pattern)

    try {
      const compileTasks = modulePaths
        .map((modulePath) => compileStylesheet([modulePath, options]))

      await Promise.all(compileTasks)
    } catch (cause) {
      throw new PluginError('compile:scss', cause)
    }
  }

  task.displayName = 'compile:scss'

  return task
}

/**
 * Compile Sass to CSS helper
 *
 * @param {AssetEntry} assetEntry - Asset entry
 */
export async function compileStylesheet ([modulePath, { srcPath, destPath, filePath }]) {
  const moduleSrcPath = join(srcPath, modulePath)
  const moduleDestPath = join(destPath, filePath ? filePath(parse(modulePath)) : modulePath)

  let css
  let map

  // Configure PostCSS
  const options = {
    from: moduleSrcPath,
    to: moduleDestPath
  }

  // Compile Sass to CSS
  if (moduleDestPath.endsWith('.css')) {
    ({ css, sourceMap: map } = await compileAsync(moduleSrcPath, {
      alertColor: true,

      // Turn off dependency warnings
      quietDeps: true,

      // Enable source maps
      sourceMap: true,
      sourceMapIncludeSources: true,

      // Resolve @imports via
      loadPaths: [
        join(paths.root, 'node_modules/govuk_frontend_toolkit/stylesheets'),
        join(paths.root, 'node_modules')
      ],

      // Sass custom logger
      logger: logger({
        suppressed: [
          'Using / for division is deprecated and will be removed in Dart Sass 2.0.0.',
          'Using / for division outside of calc() is deprecated and will be removed in Dart Sass 2.0.0.'
        ]
      }),

      verbose: true
    }))

    // Pass source maps to PostCSS
    options.map = {
      annotation: true,
      inline: false,
      prev: map
    }
  }

  if (!css) {
    css = await readFile(moduleSrcPath)
  }

  // Locate PostCSS config
  const config = await postcssrc(options)

  // Transform with PostCSS
  // @ts-expect-error "This expression is not callable" due to incorrect types
  const result = await postcss(config.plugins)
    .process(css, { ...options, ...config.options })

  // Write to files
  return assets.write(moduleDestPath, result)
}

/**
 * Sass custom logger
 *
 * @param {{ suppressed: string[] }} config - Logger config
 * @returns {import('sass-embedded').Logger} Sass logger
 */
export const logger = (config) => ({
  warn (message, options) {
    let log = `${message}\n`

    // Silence Sass suppressed warnings
    if (config.suppressed.some((warning) => log.includes(warning))) {
      return
    }

    // Check for code snippet
    if (options.span) {
      const { context, start, text } = options.span

      // Line number with column width
      const number = start.line + 1
      const column = ' '.repeat(`${number}`.length)

      // Source code warning arrows
      const arrows = '^'.repeat(text.length)
        .padStart(context.indexOf(text) + text.length)

      // Source code snippet showing warning in red
      log += '\n\n'
      log += `${chalk.blue(`${column} ╷`)}\n`
      log += `${chalk.blue(`${number} │`)} ${context.replace(text, chalk.red(text))}`
      log += `${chalk.blue(`${column} │`)} ${chalk.red(arrows)}\n`
      log += `${chalk.blue(`${column} ╵`)}\n`
    }

    // Check for stack trace
    options.stack?.trim().split('\n').forEach((line) => {
      log += `    ${line}\n`
    })

    const title = chalk.bold.yellow(options.deprecation
      ? 'Deprecation Warning'
      : 'Warning')

    console.warn(`${title}: ${log}`)
  }
})

/**
 * @typedef {import('./assets.mjs').AssetEntry} AssetEntry
 * @typedef {import('./assets.mjs').AssetOutput} AssetOutput
 */