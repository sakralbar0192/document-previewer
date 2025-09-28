<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import styles from './styles.module.scss'

interface Props {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

interface Emits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const emit = defineEmits<Emits>()

const buttonClasses = computed(() => {
  const baseClass = styles['action-button']
  const variantClass = styles[`action-button--${props.variant}`]

  return [
    baseClass,
    variantClass
  ]
})

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>
