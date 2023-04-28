import { paths } from 'govuk-frontend-config'
import { npm, task } from 'govuk-frontend-tasks'
import gulp from 'gulp'
import slash from 'slash'

import { scripts, styles } from './index.mjs'

/**
 * Watch task
 * During development, this task will:
 * - lint and run `gulp styles` when `.scss` files change
 * - lint and run `gulp scripts` when `.mjs` files change
 *
 * @type {import('govuk-frontend-tasks').TaskFunction}
 */
export const watch = (options) => gulp.parallel(
  /**
   * Stylesheets lint + build watcher
   */
  task.name('compile:scss watch', () =>
    gulp.watch([
      `${slash(paths.root)}/sassdoc.config.yaml`,
      `${slash(paths.app)}/src/**/*.scss`,
      `${slash(paths.src)}/govuk/**/*.scss`,
      `!${slash(paths.src)}/govuk/vendor/*`
    ], gulp.parallel(
      npm.script('lint:scss'),
      styles(options)
    ))
  ),

  /**
   * JavaScripts lint + build watcher
   */
  task.name('compile:js watch', () =>
    gulp.watch([
      `${slash(paths.root)}/typedoc.config.js`,
      `${slash(paths.src)}/govuk/**/*.mjs`
    ], gulp.parallel(
      npm.script('lint:js'),
      scripts(options)
    ))
  )
)
