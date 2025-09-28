<template>
  <div :class="styles['documents-page']">
    <header :class="styles['documents-page__header']">
      <h1 :class="styles['documents-page__page-title']">{{ $t($route.meta?.['title'] as string) || $t('pages.documents.title') }}</h1>
      <span :class="styles['documents-page__user-info']">
        <!-- TODO delegate to userStore -->
        USERNAME
      </span>
    </header>

    <main :class="styles['documents-page__main']">
      <aside :class="styles['documents-page__sidebar']">
        <slot name="aside" ></slot>
      </aside>

      <section :class="styles['documents-page__content']">
        <slot name="content" ></slot>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import styles from '@/styles/layouts/DefaultLayout.module.scss'
</script>
