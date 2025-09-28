<template>
  <article :class="[styles['document-card'], {
    [styles['document-card--active'] as string]: selectedDocument?.id === document.id
  }]">
    <div :class="styles['document-card__image']">
      <DocumentImage :src="document.image || ''" :alt="document.name" />
    </div>
    <div :class="styles['document-card__content']">
      <div :class="styles['document-card__title']">
        <h3>{{ document.name }}</h3>
      </div>
      <span :class="styles['document-card__size']">{{ formatFileSize(calculateFileSize(document.description)) }}</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Document } from '@/features/documents/types/document';
import styles from './styles.module.scss'
import { useDocumentsStore } from '@/features/documents/stores/documentsStore';
import { computed } from 'vue';
import DocumentImage from 'documents/components/DocumentImage/index.vue';

interface Props {
  document: Document
}

const {document} = defineProps<Props>()

const documentsStore = useDocumentsStore()
const selectedDocument = computed(() => documentsStore.selectedDocument)

const calculateFileSize = (text: string): number => {
  // UTF-8 encoding: каждый символ в среднем 1-3 байта
  // Добавляем BOM (3 байта) + переводы строк (2 байта каждый)
  const estimatedBytes = text.length * 2 + 3 + (text.match(/\n/g) || []).length * 2
  return Math.max(estimatedBytes, 1024) // минимум 1KB
}

// Utility function для форматирования размера файла
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>
