import { beforeAll } from 'vitest'
import { ref, computed, reactive, nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'

beforeAll(async() => {
  setActivePinia(createPinia())

  await new Promise(resolve => setTimeout(resolve, 1000))
})

Object.assign(globalThis, { ref, computed, reactive, nextTick })
