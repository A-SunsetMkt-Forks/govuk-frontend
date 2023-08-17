/**
 * Nunjucks macro option (or param) configs
 *
 * @satisfies {{ [param: string]: import('@govuk-frontend/lib/components').ComponentOption }}
 */
export const params = {
  text: {
    type: 'string',
    required: false,
    description:
      'Text for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with \'Emergency\' visually hidden.'
  },
  html: {
    type: 'string',
    required: false,
    description:
      'HTML for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with \'Emergency\' visually hidden.'
  },
  redirectUrl: {
    type: 'string',
    required: false,
    description:
      'URL to redirect the current tab to. Defaults to `"https://www.bbc.co.uk/weather"`.'
  },
  id: {
    type: 'string',
    required: false,
    description: 'ID attribute to add to the exit this page container.'
  },
  classes: {
    type: 'string',
    required: false,
    description: 'Classes to add to the exit this page container.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'HTML attributes (for example data attributes) to add to the exit this page container.'
  },
  activatedText: {
    type: 'string',
    required: false,
    description:
      'Text announced by screen readers when Exit this Page has been activated via the keyboard shortcut. Defaults to `"Loading."`.'
  },
  timedOutText: {
    type: 'string',
    required: false,
    description:
      'Text announced by screen readers when the keyboard shortcut has timed out without successful activation. Defaults to `"Exit this page expired."`.'
  },
  pressTwoMoreTimesText: {
    type: 'string',
    required: false,
    description:
      'Text announced by screen readers when the user must press <kbd>Shift</kbd> two more times to activate the button. Defaults to `"Shift, press 2 more times to exit."`.'
  },
  pressOneMoreTimeText: {
    type: 'string',
    required: false,
    description:
      'Text announced by screen readers when the user must press <kbd>Shift</kbd> one more time to activate the button. Defaults to `"Shift, press 1 more time to exit."`.'
  }
}
