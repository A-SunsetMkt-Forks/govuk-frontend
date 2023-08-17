/**
 * Nunjucks macro option (or param) configs
 *
 * @satisfies {{ [param: string]: import('@govuk-frontend/lib/components').ComponentOption }}
 */
export const params = {
  element: {
    type: 'string',
    required: false,
    description:
      'HTML element for the button component – `input`, `button` or `a`. In most cases you will not need to set this as it will be configured automatically if `href` is provided. This parameter will be removed in the next major version.'
  },
  text: {
    type: 'string',
    required: true,
    description:
      'If `html` is set, this is not required. Text for the `input`, `button` or `a` element. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined.'
  },
  html: {
    type: 'string',
    required: true,
    description:
      'If `text` is set, this is not required. HTML for the `button` or `a` element only. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined. This option has no effect if `element` is set to `"input"`.'
  },
  name: {
    type: 'string',
    required: false,
    description:
      'Name for the `input` or `button`. This has no effect on `a` elements.'
  },
  type: {
    type: 'string',
    required: false,
    description:
      'Type for the `input` or `button` element – `"button"`, `"submit"` or `"reset"`. Defaults to `"submit"`. This has no effect on `a` elements.'
  },
  value: {
    type: 'string',
    required: false,
    description:
      'Value for the `button` element only. This has no effect on `a` or `input` elements.'
  },
  disabled: {
    type: 'boolean',
    required: false,
    description:
      'Whether the button component should be disabled. For `input` and `button` elements, `disabled` and `aria-disabled` attributes will be set automatically. This has no effect on `a` elements.'
  },
  href: {
    type: 'string',
    required: false,
    description:
      'The URL that the button component should link to. If this is set, `element` will be automatically set to `"a"` if it has not already been defined.'
  },
  classes: {
    type: 'string',
    required: false,
    description: 'Classes to add to the button component.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'HTML attributes (for example data attributes) to add to the button component.'
  },
  preventDoubleClick: {
    type: 'boolean',
    required: false,
    description:
      'Prevent accidental double clicks on submit buttons from submitting forms multiple times.'
  },
  isStartButton: {
    type: 'boolean',
    required: false,
    description: "Use for the main call to action on your service's start page."
  },
  id: {
    type: 'string',
    required: false,
    description: 'The ID of the button.'
  }
}
