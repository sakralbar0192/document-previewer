<template>
  <DefaultLayout>
    <template #aside>
      <AsideBlock/>
    </template>
    <template #content>
      <DocumentPreview/>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DocumentPreview from 'documents/components/DocumentPreview/index.vue'
import DefaultLayout from '@/layouts/DefaultLayout/index.vue'
import AsideBlock from 'documents/components/AsideBlock/index.vue'
</script>
