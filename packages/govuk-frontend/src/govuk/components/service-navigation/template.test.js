const { render } = require('@govuk-frontend/helpers/nunjucks')
const { getExamples } = require('@govuk-frontend/lib/components')

describe('Service Navigation', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('service-navigation')
  })

  it('renders the container as a <div> if a service name is missing', () => {
    const $ = render('service-navigation', examples.default)
    const tagName = $('.govuk-service-navigation').get(0).tagName

    expect(tagName.toLowerCase()).toBe('div')
  })

  describe('custom options', () => {
    it('renders attributes correctly', () => {
      const $ = render('service-navigation', examples.attributes)
      const $component = $('.govuk-service-navigation')

      expect($component.attr('data-foo')).toBe('bar')
      expect($component.attr('data-pika')).toBe('chu')
    })

    it('renders classes correctly', () => {
      const $ = render('service-navigation', examples.classes)
      const $component = $('.govuk-service-navigation')

      expect($component.hasClass('app-my-curious-custom-class')).toBeTruthy()
    })
  })

  describe('with navigation', () => {
    it('renders navigation', () => {
      const $ = render('service-navigation', examples.default)
      const $component = $('.govuk-service-navigation')

      const $nav = $component.find('nav.govuk-service-navigation__wrapper')
      const $list = $nav.find('ul.govuk-service-navigation__list')
      const $items = $list.find('li.govuk-service-navigation__item')
      const $firstItem = $items.find(
        'a.govuk-service-navigation__link:first-child'
      )

      expect($nav).toBeDefined()
      expect($list).toBeDefined()
      expect($items).toHaveLength(4)
      expect($firstItem.attr('href')).toBe('#/1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders navigation items containing HTML', () => {
      const $ = render(
        'service-navigation',
        examples['with HTML navigation items']
      )

      const $list = $('ul.govuk-service-navigation__list')
      const $items = $list.find('li.govuk-service-navigation__item')
      const $firstItem = $items.find(
        'a.govuk-service-navigation__link:first-child'
      )

      expect($firstItem.html().trim()).toBe('<em>Navigation item 1</em>')
    })

    it('renders default navigation label', () => {
      const $ = render('service-navigation', examples.default)
      const $component = $('.govuk-service-navigation')

      const $nav = $component.find('nav.govuk-service-navigation__wrapper')

      expect($nav.attr('aria-label')).toBe('Menu')
    })

    it('renders the default navigation ID', () => {
      const $ = render('service-navigation', examples.default)
      const $component = $('.govuk-service-navigation')

      const $nav = $component.find('.govuk-service-navigation__list')
      const $navToggle = $component.find('.govuk-service-navigation__toggle')

      const navId = $nav.attr('id')

      expect(navId).toBe('navigation')
      expect($navToggle.attr('aria-controls')).toBe(navId)
    })

    it('omits empty items from the navigation', () => {
      const $ = render(
        'service-navigation',
        examples['with navigation having empty values']
      )
      const $listItems = $('.govuk-service-navigation__list li')

      expect($listItems).toHaveLength(2)
    })

    it('omits the entire navigation if only empty items are included', () => {
      const $ = render(
        'service-navigation',
        examples['with navigation having only empty values']
      )

      const $navWrapper = $('.govuk-service-navigation__wrapper')

      expect($navWrapper).toHaveLength(0)
    })

    it('omits the entire navigation if navigation is an empty array', () => {
      const $ = render(
        'service-navigation',
        examples['with navigation being an empty array']
      )

      const $navWrapper = $('.govuk-service-navigation__wrapper')

      expect($navWrapper).toHaveLength(0)
    })

    describe('custom options', () => {
      it('renders custom navigation classes', () => {
        const $ = render(
          'service-navigation',
          examples['with custom navigation classes']
        )
        const $component = $('.govuk-service-navigation')

        const $nav = $component.find('nav.govuk-service-navigation__wrapper')

        expect($nav.hasClass('app-my-neat-navigation-class')).toBeTruthy()
      })

      it('renders custom navigation label', () => {
        const $ = render(
          'service-navigation',
          examples['with custom navigation label']
        )
        const $component = $('.govuk-service-navigation')

        const $nav = $component.find('nav.govuk-service-navigation__wrapper')

        expect($nav.attr('aria-label')).toBe('Main navigation')
      })

      it('renders custom navigation ID', () => {
        const $ = render(
          'service-navigation',
          examples['with custom navigation ID']
        )
        const $component = $('.govuk-service-navigation')

        const $nav = $component.find('.govuk-service-navigation__list')
        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        const navId = $nav.attr('id')

        expect(navId).toBe('main-nav')
        expect($navToggle.attr('aria-controls')).toBe(navId)
      })
    })

    describe('toggle button', () => {
      it('is included for navigation with multiple items', () => {
        const $ = render('service-navigation', examples.default)
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        expect($navToggle).toHaveLength(1)
        expect($navToggle.get(0).tagName).toBe('button')
        expect($navToggle.attr('type')).toBe('button')
      })

      it('is not included if collapseNavigationOnMobile is `false`', () => {
        const $ = render(
          'service-navigation',
          examples['with collapseNavigationOnMobile set to false']
        )
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        expect($navToggle).toHaveLength(0)
      })

      it('is not included if the navigation only has one item', () => {
        const $ = render(
          'service-navigation',
          examples['with a single navigation item']
        )
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        expect($navToggle).toHaveLength(0)
      })

      it('is included if the navigation only has one item but `collapseNavigationOnMobile` is true', () => {
        const $ = render(
          'service-navigation',
          examples[
            'with a single navigation item and collapseNavigationOnMobile set to true'
          ]
        )
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        expect($navToggle).toHaveLength(1)
        expect($navToggle.get(0).tagName).toBe('button')
        expect($navToggle.attr('type')).toBe('button')
      })

      it('renders the navigation toggle button hidden by default', () => {
        const $ = render('service-navigation', examples.default)
        const $component = $('.govuk-service-navigation')

        const $navToggle = $component.find('.govuk-service-navigation__toggle')

        expect($navToggle.attr('hidden')).toBeDefined()
      })

      describe('toggle label', () => {
        it("doesn't render the label by default", () => {
          const $ = render('service-navigation', examples.default)
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          expect($navToggle.attr('aria-label')).toBeUndefined()
        })

        it('does not render the label if the specified label is the same as the text', () => {
          const $ = render(
            'service-navigation',
            examples['with identical navigation toggle text and label']
          )
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          expect($navToggle.text().trim()).toBe('Enter the NavZone')
          expect($navToggle.attr('aria-label')).toBeUndefined()
        })

        it('renders custom label', () => {
          const $ = render(
            'service-navigation',
            examples['with custom navigation toggle label']
          )
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          expect($navToggle.attr('aria-label')).toBe('Enter the NavZone')
        })
      })

      describe('toggle text', () => {
        it('renders default text', () => {
          const $ = render('service-navigation', examples.default)
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          expect($navToggle.text().trim()).toBe('Menu')
        })

        it('renders custom text', () => {
          const $ = render(
            'service-navigation',
            examples['with custom navigation toggle text']
          )
          const $component = $('.govuk-service-navigation')

          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          expect($navToggle.text().trim()).toBe('Enter the NavZone')
        })

        it('bubbles custom text to the navigation label', () => {
          const $ = render(
            'service-navigation',
            examples['with custom navigation toggle text']
          )
          const $component = $('.govuk-service-navigation')

          const $nav = $component.find('nav.govuk-service-navigation__wrapper')
          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          const navLabel = $nav.attr('aria-label')
          const navToggleText = $navToggle.text().trim()

          expect(navToggleText).toBe('Enter the NavZone')
          expect(navLabel).toBe(navToggleText)
        })

        it("does not bubble custom text to the navigation label if it's been customised", () => {
          const $ = render(
            'service-navigation',
            examples['with custom navigation toggle text and navigation label']
          )
          const $component = $('.govuk-service-navigation')

          const $nav = $component.find('nav.govuk-service-navigation__wrapper')
          const $navToggle = $component.find(
            '.govuk-service-navigation__toggle'
          )

          const navLabel = $nav.attr('aria-label')
          const navToggleText = $navToggle.text().trim()

          expect(navLabel).toBe('The NavZone')
          expect(navToggleText).toBe('Enter the NavZone')
        })
      })
    })

    describe('non-linked navigation items', () => {
      it('renders text passed without a link', () => {
        const $ = render(
          'service-navigation',
          examples['with non-link navigation items']
        )

        const $navItem = $('.govuk-service-navigation__item:first-child')
        const $navLink = $navItem.find('a')
        const $navText = $navItem.find('.govuk-service-navigation__text')

        expect($navLink).toHaveLength(0)
        expect($navText).toHaveLength(1)
        expect($navText.text().trim()).toBe('Navigation item 1')
      })

      it('renders HTML passed without a link', () => {
        const $ = render(
          'service-navigation',
          examples['with non-link navigation items']
        )

        const $navItem = $('.govuk-service-navigation__item:nth-child(2)')
        const $navLink = $navItem.find('a')
        const $navText = $navItem.find('.govuk-service-navigation__text')

        expect($navLink).toHaveLength(0)
        expect($navText).toHaveLength(1)
        expect($navText.html().trim()).toBe('<em>Navigation item 2</em>')
      })
    })

    describe('active and current items', () => {
      it('renders navigation with an active item', () => {
        const $ = render(
          'service-navigation',
          examples['with navigation with an active item']
        )

        const $activeItem = $('li.govuk-service-navigation__item:nth-child(2)')
        const $activeLink = $activeItem.find('a')
        const $activeFallback = $activeItem.find('strong')

        expect($activeLink.attr('aria-current')).toBe('true')
        expect($activeFallback).toHaveLength(1)
      })

      it('renders navigation with a current item', () => {
        const $ = render(
          'service-navigation',
          examples['with navigation with a current item']
        )

        const $activeItem = $('li.govuk-service-navigation__item:nth-child(2)')
        const $activeLink = $activeItem.find('a')
        const $activeFallback = $activeItem.find('strong')

        expect($activeLink.attr('aria-current')).toBe('page')
        expect($activeFallback).toHaveLength(1)
      })
    })
  })

  describe('with service name', () => {
    it('renders the service name', () => {
      const $ = render('service-navigation', examples['with service name'])
      const $component = $('.govuk-service-navigation')

      const $serviceName = $component.find(
        '.govuk-service-navigation__service-name'
      )

      expect($serviceName.get(0).tagName).toBe('span')
      expect($serviceName.text().trim()).toBe('Service name')
    })

    it('wraps the service name with a link when a url is provided', () => {
      const $ = render('service-navigation', examples['with service link'])
      const $component = $('.govuk-service-navigation')

      const $serviceName = $component.find(
        '.govuk-service-navigation__service-name'
      )
      const $serviceLink = $serviceName.find('.govuk-service-navigation__link')

      expect($serviceLink).toHaveLength(1)
      expect($serviceLink.get(0).tagName).toBe('a')
      expect($serviceLink.attr('href')).toBe('#/')
    })

    it('does not use a link when no service url is provided', () => {
      const $ = render('service-navigation', examples['with service name'])
      const $component = $('.govuk-service-navigation')

      const $serviceName = $component.find(
        '.govuk-service-navigation__service-name'
      )
      const $serviceLink = $serviceName.find('.govuk-service-navigation__link')

      expect($serviceLink).toHaveLength(0)
    })

    describe('<section> wrapper', () => {
      it('renders the container as a <section> if a service name is present', () => {
        const $ = render('service-navigation', examples['with service name'])
        const tagName = $('.govuk-service-navigation').get(0).tagName

        expect(tagName.toLowerCase()).toBe('section')
      })

      it('renders default aria-label on the <section>', () => {
        const $ = render('service-navigation', examples['with service name'])
        const $component = $('.govuk-service-navigation')

        expect($component.attr('aria-label')).toBe('Service information')
      })

      it('renders custom aria-label on the <section>', () => {
        const $ = render(
          'service-navigation',
          examples['with custom aria-label']
        )
        const $component = $('.govuk-service-navigation')

        expect($component.attr('aria-label')).toBe('Service name and nav')
      })
    })
  })

  describe('slots', () => {
    it('inserts HTML from the `start` slot in the right place', () => {
      const $ = render('service-navigation', examples['with slotted content'])

      // Expected to be first thing in the inner container
      const $slottedElement = $('.govuk-width-container > :first-child')

      expect($slottedElement.prop('outerHTML')).toBe('<div>[start]</div>')
    })

    it('inserts HTML from the `end` slot in the right place', () => {
      const $ = render('service-navigation', examples['with slotted content'])

      // Expected to be last thing in the inner container
      const $slottedElement = $('.govuk-width-container > :last-child')

      expect($slottedElement.prop('outerHTML')).toBe('<div>[end]</div>')
    })

    it('renders the component as a <section> if `start` or `end` slots are used', () => {
      const $ = render('service-navigation', examples['with slotted content'])
      const tagName = $('.govuk-service-navigation').get(0).tagName

      expect(tagName.toLowerCase()).toBe('section')
    })

    it('inserts HTML from the `navigationStart` slot in the right place', () => {
      const $ = render('service-navigation', examples['with slotted content'])

      // Expected to be first thing in the nav list
      const $slottedElement = $(
        '.govuk-service-navigation__list > :first-child'
      )

      expect($slottedElement.prop('outerHTML')).toBe(
        '<li>[navigation start]</li>'
      )
    })

    it('inserts HTML from the `navigationEnd` slot in the right place', () => {
      const $ = render('service-navigation', examples['with slotted content'])

      // Expected to be first thing in the nav list
      const $slottedElement = $('.govuk-service-navigation__list > :last-child')

      expect($slottedElement.prop('outerHTML')).toBe(
        '<li>[navigation end]</li>'
      )
    })

    it('renders the <nav> if `navigationStart` or `navigationEnd` slots are used', () => {
      const $ = render('service-navigation', examples['with slotted content'])
      const $component = $('.govuk-service-navigation')
      const $nav = $component.find('nav.govuk-service-navigation__wrapper')
      const $list = $nav.find('ul.govuk-service-navigation__list')

      expect($nav).toBeDefined()
      expect($list).toBeDefined()
    })
  })
})
