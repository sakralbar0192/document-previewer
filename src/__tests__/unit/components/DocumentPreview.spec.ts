/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useDocumentsStore } from '@/features/documents/stores/documentsStore'
import DocumentPreview from 'documents/components/DocumentPreview/index.vue'
import ActionButton from 'documents/components/ActionButton/index.vue'
import DocumentImage from 'documents/components/DocumentImage/index.vue'
import type { Document } from 'documents/types/document'

// Мокаем сервис для избежания реальных API вызовов
vi.mock('@/features/documents/services/documentsService', () => ({
  documentsService: {
    searchDocuments: vi.fn(),
    deleteDocument: vi.fn(),
    downloadDocument: vi.fn(),
  },
}))

// Мокаем vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: vi.fn((key: string) => {
      const translations: Record<string, string> = {
        'pages.documents.preview.empty': 'Выберите документ, чтобы посмотреть его содержимое',
        'pages.documents.preview.description': 'Описание',
      }
      return translations[key] || key
    }),
  }),
}))

// Мокаем confirm для тестов
Object.defineProperty(window, 'confirm', {
  value: vi.fn(() => true),
  writable: true,
})

// Мокаем глобальный $t
Object.defineProperty(global, '$t', {
  value: vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'pages.documents.preview.empty': 'Выберите документ, чтобы посмотреть его содержимое',
      'pages.documents.preview.description': 'Описание',
    }
    return translations[key] || key
  }),
  writable: true,
})

// Мокаем CSS modules
vi.mock('documents/components/DocumentPreview/styles.module.scss', () => ({
  default: {
    'document-preview': 'document-preview',
    'document-preview__content': 'document-preview__content',
    'document-preview__empty': 'document-preview__empty',
    'document-preview__header': 'document-preview__header',
    'document-preview__actions': 'document-preview__actions',
    'document-preview__description': 'document-preview__description',
  },
}))

describe('DocumentPreview', () => {
  let store: ReturnType<typeof useDocumentsStore>
  let mockDocument: Document

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useDocumentsStore()

    mockDocument = {
      id: '1',
      name: 'Тестовый документ',
      description: 'Описание тестового документа',
      image: 'test-image.jpg',
    }

    // Устанавливаем выбранный документ
    store.selectDocument(mockDocument)

    // Мокаем методы store
    vi.spyOn(store, 'downloadDocument')
    vi.spyOn(store, 'deleteDocument')
  })

  // Глобальная конфигурация для всех тестов
  const globalMocks = {
    $t: (key: string) => {
      const translations: Record<string, string> = {
        'pages.documents.preview.empty': 'Выберите документ, чтобы посмотреть его содержимое',
        'pages.documents.preview.description': 'Описание',
        'pages.documents.preview.download': 'Скачать',
        'pages.documents.preview.delete': 'Удалить',
        'pages.documents.preview.remove': 'Удалить',
      }
      return translations[key] || key
    },
  }

  // Функция mount с глобальными моками
  const mountWithMocks = (component: any, options: any = {}) => {
    return mount(component, {
      global: {
        mocks: globalMocks,
      },
      ...options,
    })
  }

  it('should render empty state when no document is selected', () => {
    store.selectDocument(null)

    const wrapper = mountWithMocks(DocumentPreview)

    const emptyState = wrapper.find('.document-preview__empty')
    expect(emptyState.exists()).toBe(true)
    expect(emptyState.text()).toBe('Выберите документ, чтобы посмотреть его содержимое')
  })

  it('should render document content when document is selected', () => {
    const wrapper = mountWithMocks(DocumentPreview)

    // Проверяем, что контент отображается
    const content = wrapper.find('.document-preview__content')
    expect(content.exists()).toBe(true)

    // Проверяем заголовок
    const header = wrapper.find('.document-preview__header')
    expect(header.exists()).toBe(true)

    // Проверяем название документа
    const title = wrapper.find('h2')
    expect(title.text()).toBe('Тестовый документ')
  })

  it('should render document image when document has image', () => {
    const wrapper = mountWithMocks(DocumentPreview)

    const documentImage = wrapper.findComponent(DocumentImage)
    expect(documentImage.exists()).toBe(true)
    expect(documentImage.props('src')).toBe('test-image.jpg')
    expect(documentImage.props('alt')).toBe('Тестовый документ')
  })

  it('should render document description', () => {
    const wrapper = mountWithMocks(DocumentPreview)

    const description = wrapper.find('.document-preview__description')
    expect(description.exists()).toBe(true)

    const descriptionTitle = description.find('h2')
    expect(descriptionTitle.text()).toBe('Описание')

    const descriptionText = description.find('p')
    expect(descriptionText.text()).toBe('Описание тестового документа')
  })

  it('should render action buttons', () => {
    const wrapper = mountWithMocks(DocumentPreview)

    const actionButtons = wrapper.findAllComponents(ActionButton)
    expect(actionButtons.length).toBe(2)

    // Проверяем кнопку "Скачать"
    const downloadButton = actionButtons[0] as any
    expect(downloadButton.props('variant')).toBe('primary')
    expect(downloadButton.text()).toBe('Скачать')

    // Проверяем кнопку "Удалить"
    const deleteButton = actionButtons[1] as any
    expect(deleteButton.props('variant')).toBe('secondary')
    expect(deleteButton.text()).toBe('Удалить')
  })

  it('should call downloadDocument when download button is clicked', async() => {
    const wrapper = mountWithMocks(DocumentPreview)

    const actionButtons = wrapper.findAllComponents(ActionButton)
    expect(actionButtons.length).toBeGreaterThan(0)

    const downloadButton = actionButtons[0] as any
    await downloadButton.trigger('click')

    expect(store.downloadDocument).toHaveBeenCalledWith(mockDocument)
    expect(store.downloadDocument).toHaveBeenCalledTimes(1)
  })

  it('should call deleteDocument when delete button is clicked', async() => {
    const wrapper = mountWithMocks(DocumentPreview)

    const actionButtons = wrapper.findAllComponents(ActionButton)
    expect(actionButtons.length).toBeGreaterThan(1)

    const deleteButton = actionButtons[1] as any
    await deleteButton.trigger('click')

    expect(window.confirm).toHaveBeenCalledWith('Вы уверены, что хотите удалить "Тестовый документ"?')
    expect(store.deleteDocument).toHaveBeenCalledWith('1')
    expect(store.deleteDocument).toHaveBeenCalledTimes(1)
  })

  it('should disable delete button when document has no image', async() => {
    const documentWithoutImage = {
      id: '2',
      name: 'Документ без изображения',
      description: 'Описание',
    }
    store.selectDocument(documentWithoutImage)

    const wrapper = mountWithMocks(DocumentPreview)

    const actionButtons = wrapper.findAllComponents(ActionButton)
    expect(actionButtons.length).toBeGreaterThan(1)

    const deleteButton = actionButtons[1] as any
    expect(deleteButton.props('disabled')).toBe(true)
  })

  it('should enable delete button when document has image', () => {
    const wrapper = mountWithMocks(DocumentPreview)

    const actionButtons = wrapper.findAllComponents(ActionButton)
    expect(actionButtons.length).toBeGreaterThan(1)

    const deleteButton = actionButtons[1] as any
    expect(deleteButton.props('disabled')).toBe(false)
  })

  it('should not call deleteDocument when user cancels confirmation', async() => {
    (window.confirm as any).mockReturnValue(false)

    const wrapper = mountWithMocks(DocumentPreview)

    const actionButtons = wrapper.findAllComponents(ActionButton)
    expect(actionButtons.length).toBeGreaterThan(1)

    const deleteButton = actionButtons[1] as any
    await deleteButton.trigger('click')

    expect(window.confirm).toHaveBeenCalledWith('Вы уверены, что хотите удалить "Тестовый документ"?')
    expect(store.deleteDocument).not.toHaveBeenCalled()
  })

  it('should have proper CSS classes', () => {
    const wrapper = mountWithMocks(DocumentPreview)

    const root = wrapper.find('.document-preview')
    expect(root.exists()).toBe(true)

    const content = wrapper.find('.document-preview__content')
    expect(content.exists()).toBe(true)

    const actions = wrapper.find('.document-preview__actions')
    expect(actions.exists()).toBe(true)
  })
})
