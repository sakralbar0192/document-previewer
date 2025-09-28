<template>
  <DefaultLayout>
    <template #aside>
      <DocumentSearch/>
      <DocumentsList/>
    </template>
    <template #content>
      <DocumentPreview :document="null"/>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DocumentSearch from '@/features/documents/components/DocumentSearch.vue'
import DocumentsList from '@/features/documents/components/DocumentsList.vue'
import DocumentPreview from '@/features/documents/components/DocumentPreview.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
