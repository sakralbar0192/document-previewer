<template>
  <div :class="styles['documents-page']">
    <header :class="styles['documents-page__header']">
      <button
        v-if="isMobile"
        @click="toggleMobileAside"
        :class="styles['documents-page__mobile-menu-btn']"
      >
        ☰
      </button>
      <h1 :class="styles['documents-page__page-title']">{{ $t($route.meta?.['title'] as string) || $t('pages.documents.title') }}</h1>
      <span :class="styles['documents-page__user-info']">
        <!-- TODO delegate to userStore -->
        Username
      </span>
    </header>

    <main :class="styles['documents-page__main']">
      <aside :class="styles['documents-page__sidebar']">
        <slot name="aside" ></slot>
      </aside>

      <section :class="styles['documents-page__content']">
        <slot name="content" ></slot>
      </section>
    </main>

    <div
      v-if="isMobile && showMobileAside"
      @click="closeMobileAside"
      @keydown.escape="closeMobileAside"
      :class="styles['documents-page__mobile-overlay']"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, provide } from 'vue'
import { useDevice } from '@/shared/composable/useDevice'
import styles from './styles.module.scss'
import type { MobileAsideContext } from '@/shared/types'

const { isMobile } = useDevice()
const showMobileAside = ref(false)

onMounted(() => {
  if (isMobile.value) {
    showMobileAside.value = false
  }
})

const toggleMobileAside = () => {
  if (isMobile.value) {
    showMobileAside.value = !showMobileAside.value
  }
}

const closeMobileAside = () => {
  if (isMobile.value) {
    showMobileAside.value = false
  }
}

const openMobileAside = () => {
  if (isMobile.value) {
    showMobileAside.value = true
  }
}

provide('mobileAside', {
  showMobileAside: computed(() => showMobileAside.value),
  closeMobileAside,
  openMobileAside,
} as MobileAsideContext)
</script>
