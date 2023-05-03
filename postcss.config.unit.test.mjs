import configFn from './postcss.config.mjs'

describe('PostCSS config', () => {
  let env

  function getPluginNames ({ plugins }) {
    return plugins.flatMap(getPluginName)
  }

  function getPluginName ({ plugins, postcssPlugin }) {
    return plugins ? getPluginNames({ plugins }) : postcssPlugin
  }

  beforeAll(() => {
    env = 'production'
  })

  describe('Browserslist', () => {
    describe('Default environment', () => {
      it('Uses default environment', () => {
        const config = configFn({ env })

        expect(config.plugins)
          .toEqual(expect.arrayContaining([
            expect.objectContaining({
              postcssPlugin: 'autoprefixer',
              options: { env }
            })
          ]))
      })

      it.each([
        {
          from: 'example.scss',
          to: 'example.min.css'
        }
      ])('Uses default environment for $from', ({ from, to }) => {
        const config = configFn({ env, from, to })

        expect(config.plugins)
          .toEqual(expect.arrayContaining([
            expect.objectContaining({
              postcssPlugin: 'autoprefixer',
              options: { env }
            })
          ]))
      })
    })
  })

  describe('Plugins', () => {
    describe('Default', () => {
      it.each([
        {
          from: 'example.scss',
          to: 'example.min.css'
        }
      ])('Adds plugins for $from', ({ from, to }) => {
        const config = configFn({ env, from, to })

        expect(getPluginNames(config))
          .toEqual([
            'autoprefixer',
            'govuk-frontend-version',
            'postcss-discard-comments',
            'postcss-minify-gradients',
            'postcss-reduce-initial',
            'postcss-svgo',
            'postcss-normalize-display-values',
            'postcss-reduce-transforms',
            'postcss-colormin',
            'postcss-normalize-timing-functions',
            'postcss-calc',
            'postcss-convert-values',
            'postcss-ordered-values',
            'postcss-minify-selectors',
            'postcss-minify-params',
            'postcss-normalize-charset',
            'postcss-discard-overridden',
            'postcss-normalize-string',
            'postcss-normalize-unicode',
            'postcss-minify-font-values',
            'postcss-normalize-url',
            'postcss-normalize-repeat-style',
            'postcss-normalize-positions',
            'postcss-normalize-whitespace',
            'postcss-merge-longhand',
            'postcss-discard-duplicates',
            'postcss-merge-rules',
            'postcss-discard-empty',
            'postcss-unique-selectors',
            'cssnano-util-raw-cache'
          ])
      })
    })

    describe('Sass syntax parser', () => {
      it.each([
        {
          from: 'packages/govuk-frontend/src/govuk/components/accordion/_accordion.scss',
          to: 'packages/govuk-frontend/dist/govuk/components/accordion/_accordion.scss'
        }
      ])('Adds plugins for $from', ({ from, to }) => {
        const config = configFn({ env, from, to })

        expect(getPluginNames(config))
          .toEqual([
            'autoprefixer',
            'govuk-frontend-version'
          ])
      })
    })

    describe('Review app only', () => {
      it.each([
        {
          from: 'packages/govuk-frontend-review/src/stylesheets/app.scss',
          to: 'packages/govuk-frontend-review/dist/stylesheets/app.min.css'
        }
      ])('Adds plugins for $from', ({ from, to }) => {
        const config = configFn({ env, from, to })

        expect(getPluginNames(config))
          .toEqual([
            'autoprefixer',
            'postcss-pseudo-classes',
            'govuk-frontend-version',
            'postcss-discard-comments',
            'postcss-minify-gradients',
            'postcss-reduce-initial',
            'postcss-svgo',
            'postcss-normalize-display-values',
            'postcss-reduce-transforms',
            'postcss-colormin',
            'postcss-normalize-timing-functions',
            'postcss-calc',
            'postcss-convert-values',
            'postcss-ordered-values',
            'postcss-minify-selectors',
            'postcss-minify-params',
            'postcss-normalize-charset',
            'postcss-discard-overridden',
            'postcss-normalize-string',
            'postcss-normalize-unicode',
            'postcss-minify-font-values',
            'postcss-normalize-url',
            'postcss-normalize-repeat-style',
            'postcss-normalize-positions',
            'postcss-normalize-whitespace',
            'postcss-merge-longhand',
            'postcss-discard-duplicates',
            'postcss-merge-rules',
            'postcss-discard-empty',
            'postcss-unique-selectors',
            'cssnano-util-raw-cache'
          ])
      })

      it.each([
        {
          from: 'packages/govuk-frontend-review/src/stylesheets/full-page-examples/campaign-page.scss',
          to: 'packages/govuk-frontend-review/dist/stylesheets/full-page-examples/campaign-page.min.css'
        },
        {
          from: 'packages/govuk-frontend-review/src/stylesheets/full-page-examples/search.scss',
          to: 'packages/govuk-frontend-review/dist/stylesheets/full-page-examples/search.min.css'
        }
      ])("Skips plugin 'pseudo-classes' for $from", ({ from, to }) => {
        const config = configFn({ env, from, to })

        expect(getPluginNames(config))
          .not.toContain('postcss-pseudo-classes')
      })
    })
  })
})
