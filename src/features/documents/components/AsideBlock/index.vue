<template>
  <div :class="[
    styles['aside-block'],
    {
      [styles['aside-block--mobile-open'] as string]: isMobileOpen
    }
  ]">
    <div :class="styles['aside-block__content']">
      <DocumentSearch/>
      <DocumentsList @document-selected="handleDocumentSelected"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import DocumentSearch from 'documents/components/DocumentSearch/index.vue'
import DocumentsList from 'documents/components/DocumentsList/index.vue'
import styles from './styles.module.scss'
import type { MobileAsideContext } from '@/shared/types'
import { useDevice } from '@/shared/composable/useDevice'

const mobileAsideContext = inject<MobileAsideContext>('mobileAside')

const { isMobile } = useDevice()

const isMobileOpen = computed(() => mobileAsideContext?.showMobileAside.value || false)

const closeMobileAside = () => {
  if (mobileAsideContext && isMobile.value) {
    mobileAsideContext.closeMobileAside()
  }
}

const handleDocumentSelected = () => {
  if (isMobile.value) {
    closeMobileAside()
  }
}
</script>
