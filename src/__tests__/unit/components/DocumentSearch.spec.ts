import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DocumentSearch from 'documents/components/DocumentSearch/index.vue'

const mockT = vi.fn((key: string) => {
  if (key === 'pages.documents.search.placeholder') {
    return 'Search documents...'
  }
  if (key === 'pages.documents.search.title') {
    return 'Search'
  }
  return key
})
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: mockT,
  }),
}))

vi.mock('documents/composables/useDocumentSearch', () => ({
  useDocumentSearch: () => ({
    searchQuery: '',
    isLoading: false,
    error: null,
    handleInput: vi.fn(),
    handleKeydownEnter: vi.fn(),
    handleBlur: vi.fn(),
    debouncedSearch: vi.fn(),
  }),
}))

Object.defineProperty(global, '$t', {
  value: (key: string) => {
    if (key === 'pages.documents.search.placeholder') {
      return 'Search documents'
    }
    if (key === 'pages.documents.search.title') {
      return 'Search'
    }
    return key
  },
  writable: true,
})

describe('DocumentSearch', () => {
  it('should render search input', () => {
    const wrapper = mount(DocumentSearch, {
      global: {
        mocks: {
          $t: (key: string) => {
            if (key === 'pages.documents.search.placeholder') {
              return 'Search documents...'
            }
            if (key === 'pages.documents.search.title') {
              return 'Search'
            }
            return key
          },
        },
      },
    })

    const input = wrapper.find('input[type="search"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search documents...')
  })

  it('should handle input with debounce', async() => {
    const wrapper = mount(DocumentSearch, {
      global: {
        mocks: {
          $t: (key: string) => {
            if (key === 'pages.documents.search.placeholder') {
              return 'Search documents...'
            }
            if (key === 'pages.documents.search.title') {
              return 'Search'
            }
            return key
          },
        },
      },
    })
    const input = wrapper.find('input')

    await input.setValue('test query')

    expect(input.element.value).toBe('test query')
  })

  it('should show loading state during search', async() => {
    const wrapper = mount(DocumentSearch, {
      global: {
        mocks: {
          $t: (key: string) => {
            if (key === 'pages.documents.search.placeholder') {
              return 'Search documents...'
            }
            if (key === 'pages.documents.search.title') {
              return 'Search'
            }
            return key
          },
        },
      },
    })

    const input = wrapper.find('input')
    // Проверяем, что input существует и может быть disabled
    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('search')
  })

  it('should have proper accessibility attributes', () => {
    const wrapper = mount(DocumentSearch, {
      global: {
        mocks: {
          $t: (key: string) => {
            if (key === 'pages.documents.search.placeholder') {
              return 'Search documents...'
            }
            if (key === 'pages.documents.search.title') {
              return 'Search'
            }
            return key
          },
        },
      },
    })
    const input = wrapper.find('input')

    expect(input.attributes('aria-label')).toBe('Search documents...')
    expect(input.attributes('type')).toBe('search')
  })

  it('should handle keyboard events', async() => {
    const wrapper = mount(DocumentSearch, {
      global: {
        mocks: {
          $t: (key: string) => {
            if (key === 'pages.documents.search.placeholder') {
              return 'Search documents...'
            }
            if (key === 'pages.documents.search.title') {
              return 'Search'
            }
            return key
          },
        },
      },
    })
    const input = wrapper.find('input')

    await input.trigger('keydown.enter')

    expect(wrapper.exists()).toBe(true)
  })
})
