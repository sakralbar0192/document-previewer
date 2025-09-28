import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/plugins/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'documents',
      component: () => import('@/views/DocumentsPage.vue'),
      meta: {
        title: 'pages.documents.title',
        defaultTitle: 'Document Previewer',
      },
    },
  ],
})

const getSafeTitle = (titleKey: string, defaultTitle: string): string => {
  try {
    const translated = i18n.global.t(titleKey)
    return translated !== titleKey ? translated : defaultTitle
  } catch {
    // eslint-disable-next-line no-console
    console.warn(`Translation key "${titleKey}" not found, using default`)
    return defaultTitle
  }
}

router.beforeEach((to) => {
  if (to.meta?.['title']) {
    const titleKey = to.meta['title'] as string
    const defaultTitle = to.meta['defaultTitle'] as string || 'App'
    document.title = getSafeTitle(titleKey, defaultTitle)
  }
})

export default router
