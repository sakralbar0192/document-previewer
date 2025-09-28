<template>
  <label :class="styles['document-search']">
    <h2>
      {{t('pages.documents.search.title')}}
    </h2>
    <input
      :class="styles['document-search__input']"
      ref="searchInput"
      v-model="searchQuery"
      type="search"
      :placeholder="t('pages.documents.search.placeholder')"
      :aria-label="t('pages.documents.search.placeholder')"
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
import { useI18n } from 'vue-i18n'
import { useDocumentSearch } from 'documents/composables/useDocumentSearch'
import styles from './styles.module.scss'

const { t } = useI18n()

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

const focusInput = () => {
  searchInput.value?.focus()
}

onMounted(() => { focusInput() })
</script>

