<template>
  <div :class="styles['aside-block']">
    <DocumentSearch/>
    <DocumentsList/>
  </div>
</template>

<script setup lang="ts">
import DocumentSearch from 'documents/components/DocumentSearch/index.vue'
import DocumentsList from 'documents/components/DocumentsList/index.vue'
import styles from './styles.module.scss'
</script>
