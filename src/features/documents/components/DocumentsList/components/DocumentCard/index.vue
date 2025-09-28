<template>
  <article :class="[styles['document-card'], {
    [styles['document-card--active'] as string]: selectedDocument?.id === document.id
  }]">
    <div :class="styles['document-card__image']">
      <img
        v-if="document.image && !imageError"
        :src="document.image"
        :alt="document.name"
        loading="lazy"
        @error="handleImageError"
      />
      <div v-else :class="styles['document-card__placeholder']">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 1920 1536"
        >
          <path d="M640 448q0 80-56 136t-136 56t-136-56t-56-136t56-136t136-56t136 56t56 136m1024 384v448H256v-192l320-320l160 160l512-512zm96-704H160q-13 0-22.5 9.5T128 160v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5V160q0-13-9.5-22.5T1760 128m160 32v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1600q66 0 113 47t47 113"/>
        </svg>

      </div>
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
import type { Document } from 'documents/types/document';
import styles from './styles.module.scss'
import { useDocumentsStore } from '@/features/documents/stores/documentsStore';
import { computed, ref } from 'vue';

interface Props {
  document: Document
}

const {document} = defineProps<Props>()

const imageError = ref(false)

const documentsStore = useDocumentsStore()
const selectedDocument = computed(() => documentsStore.selectedDocument)

const handleImageError = () => {
  imageError.value = true
}

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
