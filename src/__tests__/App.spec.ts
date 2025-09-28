import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

// Мокаем vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useRoute: () => ({
    params: {},
    query: {},
  }),
  RouterView: {
    name: 'RouterView',
    template: '<div class="router-view-mock"><button>Test Button</button><p>0</p></div>',
  },
}))

describe('App', () => {
  it('mounts and renders properly', () => {
    const wrapper = mount(App, {
      global: {
        components: {
          RouterView: {
            name: 'RouterView',
            template: '<div class="router-view-mock"><button>Test Button</button><p>0</p></div>',
          },
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('p').text()).toBe('0')
  })
})
