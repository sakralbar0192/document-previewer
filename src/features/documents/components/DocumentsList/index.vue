<template>
  <div v-if="!!searchQuery" :class="styles['documents-list']">
    <h2>{{ $t('pages.documents.list.title') }}</h2>

    <Loader
      v-if="isLoading"
      :class="styles['documents-list__loader']"
      :size="32"
    />

    <div v-else-if="!documents.length" :class="styles['documents-list__empty']">
      <span>{{ $t('pages.documents.list.no-found') }}</span>
    </div>

    <ul v-else
        :class="styles['documents-list__grid']"
        role="listbox"
        aria-label="Documents list">
      <li
        v-for="document in documents"
        :key="document.id"
        role="option"
        :aria-selected="selectedDocument?.id === document.id"
        tabindex="0"
        @click="selectDocument(document)"
        @keydown.enter="selectDocument(document)"
        @keydown.space.prevent="selectDocument(document)"
      >
        <DocumentCard :document="document"/>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import DocumentCard from 'documents/components/DocumentCard/index.vue'
import Loader from '@/components/Loader/index.vue'
import { useDocumentsStore } from '../../stores/documentsStore'
import type { Document } from '../../types/document'
import styles from './styles.module.scss'
import { storeToRefs } from 'pinia'

interface Emits {
  (e: 'documentSelected'): void
}

const emit = defineEmits<Emits>()
const documentsStore = useDocumentsStore()

const { documents, selectedDocument, searchQuery, isLoading } = storeToRefs(documentsStore)

const selectDocument = (document: Document) => {
  documentsStore.selectDocument(document)
  emit('documentSelected')
}
</script>
