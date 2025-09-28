import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useDocumentsStore } from '@/features/documents/stores/documentsStore'
import { documentsService } from '@/features/documents/services/documentsService'
import type { Document } from '@/features/documents/types/document'

vi.mock('@/features/documents/services/documentsService', () => ({
  documentsService: {
    searchDocuments: vi.fn(),
    deleteDocument: vi.fn(),
    downloadDocument: vi.fn()
  }
}))

describe('DocumentsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty state', () => {
    const store = useDocumentsStore()

    expect(store.documents).toEqual([])
    expect(store.selectedDocument).toBeNull()
    expect(store.searchQuery).toBe('')
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should search documents', async () => {
    const mockDocuments: Document[] = [
      {
        id: '1',
        name: 'Test Document 1',
        description: 'Content 1',
      },
      {
        id: '2',
        name: 'Test Document 2',
        description: 'Content 2',
        image: 'https://example.com/image.jpg',
      }
    ]

    const mockSearchDocuments = vi.mocked(documentsService.searchDocuments)
    mockSearchDocuments.mockResolvedValue(mockDocuments)

    const store = useDocumentsStore()
    await store.searchDocuments('test query')

    expect(mockSearchDocuments).toHaveBeenCalledWith('test query')
    expect(store.documents).toEqual(mockDocuments)
    expect(store.searchQuery).toBe('test query')
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('should handle search error', async () => {
    const mockSearchDocuments = vi.mocked(documentsService.searchDocuments)
    mockSearchDocuments.mockRejectedValue(new Error('API Error'))

    const store = useDocumentsStore()
    await store.searchDocuments('test query')

    expect(store.documents).toEqual([])
    expect(store.searchQuery).toBe('test query')
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('API Error')
  })

  it('should set loading state during search', async () => {
    const mockSearchDocuments = vi.mocked(documentsService.searchDocuments)
    let resolvePromise: (value: Document[]) => void
    const promise = new Promise<Document[]>((resolve) => {
      resolvePromise = resolve
    })
    mockSearchDocuments.mockReturnValue(promise)

    const store = useDocumentsStore()
    const searchPromise = store.searchDocuments('test query')

    expect(store.isLoading).toBe(true)
    expect(store.error).toBeNull()

    resolvePromise!([
      {
        id: '1',
        name: 'Test Document',
        description: 'Content',
      }
    ])

    await searchPromise

    expect(store.isLoading).toBe(false)
  })

  it('should select document', () => {
    const store = useDocumentsStore()
    const document: Document = {
      id: '1',
      name: 'Test Document',
      description: 'Content',
    }

    store.selectDocument(document)

    expect(store.selectedDocument).toEqual(document)
  })

  it('should clear selected document', () => {
    const store = useDocumentsStore()
    const document: Document = {
      id: '1',
      name: 'Test Document',
      description: 'Content',
    }

    store.selectDocument(document)
    expect(store.selectedDocument).toEqual(document)

    store.selectDocument(null)
    expect(store.selectedDocument).toBeNull()
  })

  it('should have correct hasSelectedDocumentImage getter', () => {
    const store = useDocumentsStore()

    // No selected document
    expect(store.hasSelectedDocumentImage).toBe(false)

    const documentWithoutImage: Document = {
      id: '1',
      name: 'Test Document',
      description: 'Content',
    }
    store.selectDocument(documentWithoutImage)
    expect(store.hasSelectedDocumentImage).toBe(false)

    const documentWithImage: Document = {
      id: '2',
      name: 'Test Document 2',
      description: 'Content 2',
      image: 'https://example.com/image.jpg',
    }
    store.selectDocument(documentWithImage)
    expect(store.hasSelectedDocumentImage).toBe(true)
  })
})
