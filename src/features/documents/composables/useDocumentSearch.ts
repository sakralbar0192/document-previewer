import { ref, computed, onUnmounted, nextTick } from 'vue'
import { useDocumentsStore } from '../stores/documentsStore'

export interface UseDocumentSearchOptions {
  debounceMs?: number
  minQueryLength?: number
  onAfterSearch?: () => void
}

export function useDocumentSearch(options: UseDocumentSearchOptions = {}) {
  const { debounceMs = 300, minQueryLength = 1, onAfterSearch } = options

  const documentsStore = useDocumentsStore()
  const searchQuery = ref('')
  const debounceTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  const lastSearchQuery = ref('')

  const isLoading = computed(() => documentsStore.isLoading)
  const error = computed(() => documentsStore.error)

  onUnmounted(() => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }
  })

  const debouncedSearch = (query: string) => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
    }

    debounceTimer.value = setTimeout(async() => {
      await performSearch(query)
    }, debounceMs)
  }

  const performSearch = async(query: string) => {
    const trimmedQuery = query.trim()

    if (trimmedQuery === lastSearchQuery.value) {
      return
    }

    lastSearchQuery.value = trimmedQuery

    if (trimmedQuery.length >= minQueryLength) {
      await documentsStore.searchDocuments(trimmedQuery)
      // Сохраняем фокус после поиска
      await nextTick()
      onAfterSearch?.()
    } else {
      documentsStore.documents = []
      lastSearchQuery.value = ''
      onAfterSearch?.()
    }
  }

  const immediateSearch = async() => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
      debounceTimer.value = null
    }

    await performSearch(searchQuery.value)
  }

  const blurSearch = async() => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value)
      debounceTimer.value = null
    }

    await performSearch(searchQuery.value)
  }

  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    const value = target.value
    searchQuery.value = value
    debouncedSearch(value)
  }

  const handleKeydownEnter = (event: KeyboardEvent) => {
    event.preventDefault()
    immediateSearch()
  }

  const handleBlur = () => {
    blurSearch()
  }

  return {
    searchQuery,
    isLoading,
    error,

    handleInput,
    handleKeydownEnter,
    handleBlur,
  }
}
