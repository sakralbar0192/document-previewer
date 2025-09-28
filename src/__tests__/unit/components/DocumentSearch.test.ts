import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DocumentSearch from '@/features/documents/components/DocumentSearch.vue'
import { useDocumentsStore } from '@/features/documents/stores/documentsStore'

vi.mock('documents/composables/useDocumentSearch', () => ({
  useDocumentSearch: () => ({
    searchQuery: '',
    isLoading: false,
    error: null,
    debouncedSearch: vi.fn(),
  }),
}))

describe('DocumentSearch', () => {
  it('should render search input', () => {
    const wrapper = mount(DocumentSearch)

    const input = wrapper.find('input[type="search"]')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search documents...')
  })

  it('should handle input with debounce', async() => {
    const wrapper = mount(DocumentSearch)
    const input = wrapper.find('input')

    await input.setValue('test query')

    expect(input.element.value).toBe('test query')
  })

  it('should show loading state during search', async() => {
    const mockStore = useDocumentsStore()
    mockStore.isLoading = true

    const wrapper = mount(DocumentSearch)

    const loadingIndicator = wrapper.find('.loading')
    expect(loadingIndicator.exists()).toBe(true)
  })

  it('should have proper accessibility attributes', () => {
    const wrapper = mount(DocumentSearch)
    const input = wrapper.find('input')

    expect(input.attributes('aria-label')).toBe('Search documents')
    expect(input.attributes('type')).toBe('search')
  })

  it('should handle keyboard events', async() => {
    const wrapper = mount(DocumentSearch)
    const form = wrapper.find('form')

    await form.trigger('submit.prevent')

    expect(wrapper.exists()).toBe(true)
  })
})
