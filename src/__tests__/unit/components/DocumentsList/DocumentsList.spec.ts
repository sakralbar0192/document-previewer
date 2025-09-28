/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useDocumentsStore } from '@/features/documents/stores/documentsStore'
import type { Document } from '@/features/documents/types/document'
import DocumentsList from '@/features/documents/components/DocumentsList/index.vue'

vi.mock('@/features/documents/components/DocumentsList/components/DocumentCard/index.vue', () => ({
  default: {
    name: 'DocumentCard',
    template: '<div class="document-card-mock">{{ document.name }}</div>',
    props: ['document'],
    setup() {
      return {}
    },
  },
}))

// Мокаем CSS modules
vi.mock('@/features/documents/components/DocumentsList/styles.module.scss', () => ({
  default: {
    'documents-list': 'documents-list',
    'documents-list__title': 'documents-list__title',
    'documents-list__list': 'documents-list__list',
    'documents-list__empty': 'documents-list__empty',
    'documents-list__item': 'documents-list__item',
  },
}))

vi.mock('@/features/documents/stores/documentsStore', () => ({
  useDocumentsStore: vi.fn(),
}))

const mockUseDocumentsStore = vi.mocked(useDocumentsStore)

describe('DocumentsList', () => {
  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'Тестовый документ 1',
      description: 'Описание первого документа',
      image: 'https://example.com/image1.jpg',
    },
    {
      id: '2',
      name: 'Тестовый документ 2',
      description: 'Описание второго документа',
      image: 'https://example.com/image2.jpg',
    },
  ]

  beforeEach(() => {
    // Мокаем useDocumentsStore
    mockUseDocumentsStore.mockReturnValue({
      documents: [],
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
      hasSelectedDocumentImage: false,
    } as any)
  })

  it('should render title', () => {
    const wrapper = mount(DocumentsList)

    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Documents')
  })

  it('should show empty state when no documents', () => {
    const wrapper = mount(DocumentsList)

    const emptyState = wrapper.find('[class*="documents-list__empty"]')
    expect(emptyState.exists()).toBe(true)
    expect(emptyState.text()).toContain('No documents found')
  })

  it('should render documents list when documents exist', () => {
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const list = wrapper.find('ul')
    expect(list.exists()).toBe(true)
    expect(list.attributes('role')).toBe('listbox')
    expect(list.attributes('aria-label')).toBe('Documents list')
  })

  it('should render correct number of document items', () => {
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const listItems = wrapper.findAll('li')
    expect(listItems).toHaveLength(2)
  })

  it.skip('should pass correct props to DocumentCard components', () => {
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const documentCards = wrapper.findAllComponents({ name: 'DocumentCard' })
    expect(documentCards).toHaveLength(2)

    expect(documentCards[0]?.props('document')).toEqual(mockDocuments[0])
    expect(documentCards[1]?.props('document')).toEqual(mockDocuments[1])
  })

  it('should handle document selection on click', async() => {
    const mockSelectDocument = vi.fn()
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: mockSelectDocument,
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const firstItem = wrapper.find('li')
    await firstItem.trigger('click')

    expect(mockSelectDocument).toHaveBeenCalledWith(mockDocuments[0])
  })

  it('should handle document selection on Enter key', async() => {
    const mockSelectDocument = vi.fn()
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: mockSelectDocument,
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const firstItem = wrapper.find('li')
    await firstItem.trigger('keydown.enter')

    expect(mockSelectDocument).toHaveBeenCalledWith(mockDocuments[0])
  })

  it('should handle document selection on Space key', async() => {
    const mockSelectDocument = vi.fn()
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: mockSelectDocument,
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const firstItem = wrapper.find('li')
    await firstItem.trigger('keydown.space')

    expect(mockSelectDocument).toHaveBeenCalledWith(mockDocuments[0])
  })

  it('should set correct aria-selected attribute for selected document', () => {
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: mockDocuments[0],
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const listItems = wrapper.findAll('li')
    expect(listItems[0]?.attributes('aria-selected')).toBe('true')
    expect(listItems[1]?.attributes('aria-selected')).toBe('false')
  })

  it('should have proper accessibility attributes on list items', () => {
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const listItems = wrapper.findAll('li')
    listItems.forEach(item => {
      expect(item.attributes('role')).toBe('option')
      expect(item.attributes('tabindex')).toBe('0')
    })
  })

  it('should not render list when documents array is empty', () => {
    const wrapper = mount(DocumentsList)

    const list = wrapper.find('ul')
    expect(list.exists()).toBe(false)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Documents')

    const emptyState = wrapper.find('[class*="documents-list__empty"]')
    expect(emptyState.exists()).toBe(true)
  })

  it('should handle keyboard navigation correctly', async() => {
    mockUseDocumentsStore.mockReturnValue({
      documents: mockDocuments,
      selectedDocument: null,
      searchQuery: 'test query',
      isLoading: false,
      error: null,
      searchDocuments: vi.fn(),
      selectDocument: vi.fn(),
      clearDocuments: vi.fn(),
    } as any)

    const wrapper = mount(DocumentsList)

    const firstItem = wrapper.find('li')
    expect(firstItem.attributes('tabindex')).toBe('0')
  })
})
