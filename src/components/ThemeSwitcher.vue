<template>
  <button
    @click="toggleTheme"
    :class="styles['theme-switcher']"
    :aria-label="$t('common.theme.toggle')"
    :title="$t('common.theme.toggle')"
  >
    <span v-if="currentTheme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import styles from './ThemeSwitcher.module.scss'

const store = useThemeStore()
const { currentTheme } = storeToRefs(store)

const toggleTheme = () => {
  store.toggleTheme()
}
</script>
