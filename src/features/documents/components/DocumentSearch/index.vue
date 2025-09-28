<template>
  <label :class="styles['document-search']">
    <h2>
      {{$t('search.title')}}
    </h2>
    <input
      :class="styles['document-search__input']"
      ref="searchInput"
      v-model="searchQuery"
      type="search"
      :placeholder="$t('search.placeholder')"
      :aria-label="$t('search.placeholder')"
      :aria-describedby="error ? 'search-error' : undefined"
      :aria-invalid="!!error"
      :disabled="isLoading"
      @input="handleInput"
      @keydown.enter="handleKeydownEnter"
      @blur="handleBlur"
      autocomplete="off"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDocumentSearch } from 'documents/composables/useDocumentSearch'
import styles from './styles.module.scss'

const searchInput = ref<HTMLInputElement>()

const {
  searchQuery,
  isLoading,
  error,
  handleInput,
  handleKeydownEnter,
  handleBlur
} = useDocumentSearch({
  debounceMs: 500,
  minQueryLength: 1,
  onAfterSearch: () => {
    focusInput()
  }
})

// Focus management
const focusInput = () => {
  searchInput.value?.focus()
}

onMounted(() => { focusInput() })

defineExpose({
  focusInput,
  searchQuery
})
</script>

