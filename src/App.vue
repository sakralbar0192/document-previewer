<script setup lang="ts">
import { useCounterStore } from './stores/counter';
import { storeToRefs } from 'pinia';

const store = useCounterStore()

const {increment} = useCounterStore()
const {count} = storeToRefs(store)
</script>

<template>
  <h1>You did it!</h1>
  <p>
    {{count}}
  </p>
  <button  @click="increment">increment</button>
</template>
