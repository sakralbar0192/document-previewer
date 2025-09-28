<template>
  <div :class="styles['document-image']">
    <img
      v-if="props.src && !imageError"
      :src="props.src"
      :alt="props.alt"
      width="100%"
      height="100%"
      loading="lazy"
      @error="handleImageError"
    />
    <div v-else :class="styles['document-image__placeholder']">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 1920 1536"
      >
        <path d="M640 448q0 80-56 136t-136 56t-136-56t-56-136t56-136t136-56t136 56t56 136m1024 384v448H256v-192l320-320l160 160l512-512zm96-704H160q-13 0-22.5 9.5T128 160v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5V160q0-13-9.5-22.5T1760 128m160 32v1216q0 66-47 113t-113 47H160q-66 0-113-47T0 1376V160Q0 94 47 47T160 0h1600q66 0 113 47t47 113"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import styles from './styles.module.scss'

interface Props {
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Document image',
  width: '30',
  height: '30',
})

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

watch(
  () => props.src,
  () => {
    imageError.value = false
  }
)
</script>
