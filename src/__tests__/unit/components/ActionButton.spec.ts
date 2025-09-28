import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionButton from 'documents/components/ActionButton/index.vue'

// Мокаем CSS modules
vi.mock('documents/components/ActionButton/styles.module.scss', () => ({
  default: {
    'action-button': 'action-button',
    'action-button--primary': 'action-button--primary',
    'action-button--secondary': 'action-button--secondary',
  },
}))

describe('ActionButton', () => {
  it('should render with primary variant by default', () => {
    const wrapper = mount(ActionButton, {
      slots: {
        default: 'Тестовая кнопка',
      },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Тестовая кнопка')
    expect(button.classes()).toContain('action-button')
    expect(button.classes()).toContain('action-button--primary')
  })

  it('should render with secondary variant when specified', () => {
    const wrapper = mount(ActionButton, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Второстепенная кнопка',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('action-button--secondary')
  })

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(ActionButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Отключенная кнопка',
      },
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('should emit click event when clicked and not disabled', async() => {
    const wrapper = mount(ActionButton, {
      slots: {
        default: 'Кликабельная кнопка',
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('should not emit click event when disabled and clicked', async() => {
    const wrapper = mount(ActionButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Отключенная кнопка',
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('should apply correct CSS classes based on variant', () => {
    // Test primary variant
    const primaryWrapper = mount(ActionButton, {
      props: {
        variant: 'primary',
      },
    })

    expect(primaryWrapper.find('button').classes()).toContain('action-button--primary')

    // Test secondary variant
    const secondaryWrapper = mount(ActionButton, {
      props: {
        variant: 'secondary',
      },
    })

    expect(secondaryWrapper.find('button').classes()).toContain('action-button--secondary')
  })
})
