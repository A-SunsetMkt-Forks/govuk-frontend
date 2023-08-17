/**
 * Nunjucks macro option (or param) configs
 *
 * @satisfies {{ [param: string]: import('@govuk-frontend/lib/components').ComponentOption }}
 */
export const params = {
  id: {
    type: 'string',
    required: true,
    description:
      'This is used for the main component and to compose the ID attribute for each item.'
  },
  namePrefix: {
    type: 'string',
    required: false,
    description:
      'Optional prefix. This is used to prefix each item `name`, separated by `-`.'
  },
  items: {
    type: 'array',
    required: false,
    description: 'The inputs within the date input component.',
    params: {
      id: {
        type: 'string',
        required: false,
        description:
          'Item-specific ID. If provided, it will be used instead of the generated ID.'
      },
      name: {
        type: 'string',
        required: true,
        description: 'Item-specific name attribute.'
      },
      label: {
        type: 'string',
        required: false,
        description:
          'Item-specific label text. If provided, this will be used instead of `name` for item label text.'
      },
      value: {
        type: 'string',
        required: false,
        description:
          'If provided, it will be used as the initial value of the input.'
      },
      autocomplete: {
        type: 'string',
        required: false,
        description:
          'Attribute to [identify input purpose](https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html), for instance `"bday-day"`. See [autofill](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used.'
      },
      pattern: {
        type: 'string',
        required: false,
        description:
          'Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/sec-forms.html#the-pattern-attribute), used to match allowed character combinations for the input value.'
      },
      classes: {
        type: 'string',
        required: false,
        description: 'Classes to add to date input item.'
      },
      attributes: {
        type: 'object',
        required: false,
        description:
          'HTML attributes (for example data attributes) to add to the date input tag.'
      }
    }
  },
  hint: {
    type: 'object',
    required: false,
    description: 'Can be used to add a hint to a date input component.',
    isComponent: true
  },
  errorMessage: {
    type: 'object',
    required: false,
    description:
      'Can be used to add an error message to the date input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`.',
    isComponent: true
  },
  formGroup: {
    type: 'object',
    required: false,
    description:
      'Additional options for the form group containing the date input component.',
    params: {
      classes: {
        type: 'string',
        required: false,
        description:
          'Classes to add to the form group (for example to show error state for the whole group).'
      },
      attributes: {
        type: 'object',
        required: false,
        description:
          'HTML attributes (for example data attributes) to add to the form group.'
      }
    }
  },
  fieldset: {
    type: 'object',
    required: false,
    description: 'Can be used to add a fieldset to the date input component.',
    isComponent: true
  },
  classes: {
    type: 'string',
    required: false,
    description: 'Classes to add to the date-input container.'
  },
  attributes: {
    type: 'object',
    required: false,
    description:
      'HTML attributes (for example data attributes) to add to the date-input container.'
  }
}
