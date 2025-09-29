import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { documentsService } from '../services/documentsService'
import type { Document } from '../types/document'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
import { shouldUseDownloadFallback } from '@/shared/utils/deviceUtils'

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<Document[]>([])
  const selectedDocument = ref<Document | null>(null)
  const searchQuery = ref<string>('')
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const hasSelectedDocumentImage = computed(() => {
    return selectedDocument.value?.image !== null && selectedDocument.value?.image !== undefined
  })

  const searchDocuments = async(query: string) => {
    isLoading.value = true
    error.value = null
    searchQuery.value = query
    try {
      const result = await documentsService.searchDocuments(query)
      documents.value = result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      documents.value = []
    } finally {
      isLoading.value = false
    }
  }

  const selectDocument = (document: Document | null) => {
    if (selectedDocument.value?.id === document?.id) {
      selectedDocument.value = null
    } else {
      selectedDocument.value = document
    }
  }

  const deleteDocument = async(id: string) => {
    isLoading.value = true
    error.value = null
    try {
      await documentsService.deleteDocument(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      documents.value = documents.value.filter(doc => doc.id !== id)
      if (selectedDocument.value?.id === id) {
        selectedDocument.value = null
      }

      isLoading.value = false
    }
  }

  const downloadDocument = async(doc: Document) => {
    try {
      const blob = await documentsService.downloadDocument(doc)
      const url = window.URL.createObjectURL(blob)
      const fileName = `${doc.name || 'document'}.txt`

      if (shouldUseDownloadFallback()) {
        // Для iOS и других устройств с ограниченной поддержкой скачивания
        const reader = new FileReader()
        reader.onload = function(e) {
          const popup = window.open()
          if (popup) {
            popup.document.write(
              `<pre>${e.target?.result}</pre>` +
              '<style>body { font-family: monospace; white-space: pre-wrap; word-wrap: break-word; }</style>',
            )
            popup.document.title = fileName
          } else {
            // Fallback: показать alert с инструкцией
            alert('Для скачивания файла на iOS, пожалуйста, используйте Safari и разрешите всплывающие окна')
          }
        }
        reader.readAsText(blob)
      } else {
        // Стандартный подход для десктопа и Android
        const link = window.document.createElement('a')
        link.href = url
        link.download = fileName
        link.style.display = 'none'

        window.document.body.appendChild(link)

        // Используем разные методы клика для лучшей совместимости
        if (link.click) {
          link.click()
        } else {
          // Fallback для старых браузеров
          const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
          })
          link.dispatchEvent(event)
        }

        // Небольшая задержка для Android
        setTimeout(() => {
          window.document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }, 100)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка при скачивании файла'
      console.error('Download error:', err)
    }
  }

  return {
    documents,
    selectedDocument,
    searchQuery,
    isLoading,
    error,
    hasSelectedDocumentImage,
    searchDocuments,
    selectDocument,
    deleteDocument,
    downloadDocument,
  }
}, {
  persist: {
    pick: ['searchQuery'],
  } as PersistenceOptions,
})
