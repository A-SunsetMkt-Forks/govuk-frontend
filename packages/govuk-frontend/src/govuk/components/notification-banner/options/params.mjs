/**
 * Nunjucks macro option (or param) configs
 *
 * @satisfies {{ [param: string]: import('@govuk-frontend/lib/components').ComponentOption }}
 */
export const params = {
  text: {
    type: 'string',
    required: true,
    description:
      'The text that displays in the notification banner. You can use any string with this option. If you set `html`, this option is not required and is ignored.'
  },
  html: {
    type: 'string',
    required: true,
    description:
      'The HTML to use within the notification banner. You can use any string with this option. If you set `html`, `text` is not required and is ignored.'
  },
  caller: {
    type: 'nunjucks-block',
    required: false,
    description:
      'Not strictly a parameter but [Nunjucks code convention](https://mozilla.github.io/nunjucks/templating.html#call). Using a `call` block enables you to call a macro with all the text inside the tag. This is helpful if you want to pass a lot of content into a macro. To use it, you will need to wrap the entire notification banner component in a `call` block.'
  },
  titleText: {
    type: 'string',
    required: false,
    description:
      "The title text that displays in the notification banner. You can use any string with this option. Use this option to set text that does not contain HTML. The available default values are 'Important', 'Success', and null:\n" +
      '- if you do not set `type`, `titleText` defaults to `"Important"`\n' +
      '- if you set `type` to `success`, `titleText` defaults to `"Success"`\n' +
      '- if you set `titleHtml`, this option is ignored\n'
  },
  titleHtml: {
    type: 'string',
    required: false,
    description:
      'The title HTML to use within the notification banner. You can use any string with this option. Use this option to set text that contains HTML. If you set `titleHtml`, the `titleText` option is ignored.'
  },
  titleHeadingLevel: {
    type: 'string',
    required: false,
    description:
      'Sets heading level for the title only. You can only use values between `1` and `6` with this option. The default is `2`.'
  },
  type: {
    type: 'string',
    required: false,
    description:
      'The type of notification to render. You can use only `"success"` or `null` values with this option. If you set `type` to `"success"`, the notification banner sets `role` to `"alert"`. JavaScript then moves the keyboard focus to the notification banner when the page loads. If you do not set `type`, the notification banner sets `role` to `"region"`.'
  },
  role: {
    type: 'string',
    required: false,
    description:
      'Overrides the value of the `role` attribute for the notification banner. Defaults to `"region"`. If you set `type` to `"success"`, `role` defaults to `"alert"`.'
  },
  titleId: {
    type: 'string',
    required: false,
    description:
      'The `id` for the banner title, and the `aria-labelledby` attribute in the banner. Defaults to `"govuk-notification-banner-title"`.'
  },
  disableAutoFocus: {
    type: 'boolean',
    required: false,
    description:
      'If you set `type` to `"success"`, or `role` to `"alert"`, JavaScript moves the keyboard focus to the notification banner when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`.'
  },
  classes: {
    type: 'string',
    required: false,
    description: 'The classes that you want to add to the notification banner.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'The HTML attributes that you want to add to the notification banner, for example, data attributes.'
  }
}
