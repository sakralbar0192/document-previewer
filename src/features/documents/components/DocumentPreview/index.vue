<template>
  <div :class="styles['document-preview']">
    <div v-if="selectedDocument" :class="styles['document-preview__content']">
      <div :class="styles['document-preview__image']">
        <DocumentImage
          width="200px"
          height="100px"
          :src="selectedDocument.image || ''"
          :alt="selectedDocument.name" />
      </div>

      <div :class="styles['document-preview__main']">
        <header :class="styles['document-preview__header']">
          <h2>{{ selectedDocument.name }}</h2>
          <div :class="styles['document-preview__actions']">
            <ActionButton
              variant="primary"
              @click="downloadDocument"
            >
              {{$t('pages.documents.preview.download')}}
            </ActionButton>
            <ActionButton
              variant="secondary"
              :disabled="!hasImage"
              @click="deleteDocument"
            >
              {{$t('pages.documents.preview.remove')}}
            </ActionButton>
          </div>
        </header>

        <div :class="styles['document-preview__description']">
          <h2>{{$t('pages.documents.preview.description')}}</h2>
          <p>{{ selectedDocument.description }}</p>
        </div>
      </div>
    </div>

    <div v-else :class="styles['document-preview__empty']">
      <p>{{$t('pages.documents.preview.empty')}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Ref } from 'vue'
import { useDocumentsStore } from 'documents/stores/documentsStore'
import type { Document } from 'documents/types/document'
import DocumentImage from 'documents/components/DocumentImage/index.vue'
import ActionButton from 'documents/components/ActionButton/index.vue'
import styles from './styles.module.scss'

const documentsStore = useDocumentsStore()

const selectedDocument: Ref<Document | null> = computed(() => documentsStore.selectedDocument)

const hasImage = computed(() => {
  return selectedDocument.value?.image != null && selectedDocument.value?.image !== ''
})

const downloadDocument = async () => {
  if (selectedDocument.value) {
    await documentsStore.downloadDocument(selectedDocument.value)
  }
}

const deleteDocument = async () => {
  if (selectedDocument.value) {
    if (confirm(`Вы уверены, что хотите удалить "${selectedDocument.value.name}"?`)) {
      await documentsStore.deleteDocument(selectedDocument.value.id)
    }
  }
}
</script>

