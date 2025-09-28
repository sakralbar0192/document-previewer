<template>
  <button
    @click="toggleLanguage"
    :class="styles['language-switcher']"
    :aria-label="$t('common.language.toggle')"
    :title="$t('common.language.toggle')"
  >
    {{ currentLocale === 'ru' ? 'EN' : 'RU' }}
  </button>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'
import styles from './styles.module.scss'

const store = useLocaleStore()
const { currentLocale } = storeToRefs(store)

const toggleLanguage = () => {
  const newLocale = currentLocale.value === 'ru' ? 'en' : 'ru'
  store.setLocale(newLocale)
}
</script>
