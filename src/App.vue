<script setup lang="ts">
import { onMounted } from 'vue'
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()

const {increment} = useCounterStore()
const {count} = storeToRefs(store)

onMounted(async () => {
  // eslint-disable-next-line no-console
  console.log(await fetch('https://test-app-csm.up.railway.app/user/docs').then(res => res.json()))
})
</script>

<template>
  <h1>You did it!</h1>
  <p>
    {{count}}
  </p>
  <button  @click="increment">increment</button>
</template>
