<template>
  <select :value="currentLocale" @input="handleLanguageChange">
    <option value="ru">Русский</option>
    <option value="en">English</option>
  </select>
</template>

<script setup lang="ts">
import { useLocaleStore } from '@/stores/locale'
import { storeToRefs } from 'pinia'

const store = useLocaleStore()
const { currentLocale } = storeToRefs(store)

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value as 'ru' | 'en'
  store.setLocale(newLocale)
}
</script>
