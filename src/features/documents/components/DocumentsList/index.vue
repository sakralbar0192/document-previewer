<template>
  <div v-if="searchQuery" :class="styles['documents-list']">
    <h2>Documents</h2>

    <div v-if="!documents.length" :class="styles['documents-list__empty']">
      <span>No documents found</span>
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
import { computed } from 'vue'
import { useDocumentsStore } from '../../stores/documentsStore'
import type { Document } from '../../types/document'
import styles from './styles.module.scss'

const documentsStore = useDocumentsStore()

const documents = computed(() => documentsStore.documents)
const selectedDocument = computed(() => documentsStore.selectedDocument)
const searchQuery = computed(() => documentsStore.searchQuery)

const selectDocument = (document: Document) => {
  documentsStore.selectDocument(document)
}
</script>
