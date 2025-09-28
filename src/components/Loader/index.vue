<template>
  <div
    v-if="visible"
    :class="styles['loader']"
    :style="{ width: size + 'px', height: size + 'px' }"
    role="status"
    :aria-label="$t('common.loading')"
  >
    <div :style="{ width: size + 'px', height: size + 'px' }" :class="styles['loader-spinner']"></div>
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.scss'

interface Props {
  visible?: boolean
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  size: 24,
})
</script>
