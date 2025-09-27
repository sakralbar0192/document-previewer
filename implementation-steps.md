# План реализации Document Previewer

## Обзор
Детальный план реализации с TDD подходом - тесты пишутся параллельно с разработкой фичей. Общий бюджет: 27.75 рабочих часов (можно оптимизировать до 23-25.75 часов). Всего 35+ коммитов. Фокус на понимании процесса сборки и осознанном выборе технологий (Vite + Bun). ESLint вместо Prettier для упрощения.

## Правила коммитов
Все коммиты должны следовать Conventional Commits и обязательно содержать время выполнения:

```
type(scope): description

[optional body]

Time: X min
```

Примеры:
- `feat: add user authentication\n\nTime: 45 min`
- `test: add unit tests for login component\n\nTime: 30 min`
- `fix: resolve memory leak in data fetching\n\nTime: 15 min`

## Итерация 1: Настройка проекта (7 часов)

### Шаг 1.1: Инициализация Vue 3 проекта с Vite (30 мин)
```bash
# Создание базового Vue 3 проекта с Vite сборщиком
# Осознанный выбор: Vite для быстрой разработки и современной сборки
bun create vue@latest document-previewer --typescript --router --pinia --eslint
cd document-previewer

# Проверка работоспособности Vite dev server
bun run dev
# Должен запуститься на http://localhost:5173
```

**Коммит:** `feat: initialize vue3 project with vite bundler

Time: 30 min`

### Шаг 1.2: Настройка TypeScript strict mode (45 мин)
```bash
# Настройка tsconfig.json для strict mode
# Осознанный выбор: максимальная типобезопасность для надежного кода
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}

# Проверка: bun run type-check
```

**Коммит:** `feat: configure typescript strict mode

Time: 45 min`

### Шаг 1.3: Настройка линтеров (ESLint + Stylelint) (1 час)
```bash
# Установка ESLint + TypeScript + Stylelint зависимостей
bun add -d @typescript-eslint/eslint-plugin @typescript-eslint/parser
bun add -d stylelint stylelint-config-standard-scss stylelint-config-recommended-vue

# Создание eslint.config.js и stylelint.config.js
# Осознанный выбор: комплексный линтинг для качества кода
# Проверка: bun run lint && bun run stylelint
```

**Коммит:** `feat: setup eslint and stylelint with typescript support

Time: 60 min`

### Шаг 1.4: Настройка SCSS препроцессора (45 мин)
```bash
# Установка SCSS
bun add -d sass

# Настройка Vite для SCSS
# Создание базовых SCSS файлов
# Осознанный выбор: SCSS для мощных возможностей CSS (переменные, миксины, nesting)
```

**Коммит:** `feat: setup scss preprocessor`

### Шаг 1.5: Настройка CSS Modules (30 мин)
```bash
# Настройка CSS Modules в Vite
# Создание примеров .module.scss файлов
# Осознанный выбор: CSS Modules для изоляции стилей компонентов
```

**Коммит:** `feat: setup css modules`

### Шаг 1.6: Создание дизайн системы (1 час)
```bash
# Создание src/styles/variables.scss с кастомными свойствами
# Определение цветовой палитры для light/dark тем
# Переменные для шрифтов, отступов, размеров
# Базовая настройка переключения тем (CSS custom properties)
# Осознанный выбор: дизайн токены для поддерживаемости и консистентности

// Пример:
:root {
  --color-primary: #007bff;
  --font-family: 'Montserrat', sans-serif;
  --spacing-unit: 8px;
}

[data-theme="dark"] {
  --color-background: #1a1a1a;
  --color-text: #ffffff;
}

// Базовый theme switcher в UIStore
```

**Коммит:** `feat: create design system with theme variables and basic switching

Time: 60 min`

### Шаг 1.7: Настройка Pinia с персистентностью (30 мин)
```bash
# Установка pinia-plugin-persistedstate
bun add pinia-plugin-persistedstate

# Настройка в main.ts
# Создание базовых stores с persist конфигурацией
```

**Коммит:** `feat: setup pinia with persisted state plugin

Time: 30 min`

### Шаг 1.8: Настройка Husky и pre-commit hooks (45 мин)
```bash
# Установка Husky, lint-staged и commitlint
bun add -d husky lint-staged @commitlint/cli @commitlint/config-conventional

# Инициализация Husky
bunx husky init

# Настройка commitlint с кастомными правилами
cat > commitlint.config.js << 'EOF'
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [0, 'never'],
    'body-max-line-length': [0, 'never'],
    'body-min-length': [2, 'always'],
    'body-case': [0, 'never']
  },
  plugins: [
    {
      rules: {
        'body-requires-time': (parsed) => {
          const { body } = parsed;
          if (!body || !body.includes('Time:')) {
            return [false, 'Commit message must include "Time: X min" in body'];
          }
          return [true];
        }
      }
    }
  ],
  rules: {
    'body-requires-time': [2, 'always']
  }
};
EOF

# Настройка lint-staged в package.json (ESLint + Stylelint)
# Создание .husky/pre-commit
# Создание .husky/commit-msg для проверки коммитов

# Проверка: git add . && git commit -m "test: setup commit hooks

Time: 45 min"
```

**Коммит:** `feat: setup husky pre-commit hooks with commitlint

Time: 45 min`

### Шаг 1.9: Настройка Vitest для тестирования (30 мин)
```bash
# Установка тестирования
bun add -d vitest @vue/test-utils jsdom @types/jsdom

# Настройка vitest.config.ts
# Добавление test скриптов в package.json
# Проверка: bun run test
```

**Коммит:** `feat: setup vitest testing framework`

### Шаг 1.10: Установка основных зависимостей (30 мин)
```bash
# Установка runtime зависимостей
bun add pinia-plugin-persistedstate axios vue-i18n msw @types/node

# Проверка импортов в main.ts
```

**Коммит:** `feat: install core dependencies`


### Шаг 1.12: Настройка Docker (45 мин)
```bash
# Создание docker/Dockerfile.dev
# Создание docker/docker-compose.yml
# Создание .env.example

# Тестирование: make docker-build-dev && make docker-dev
```

**Коммит:** `feat: setup docker development environment`

### Шаг 1.15: Настройка MSW для Docker (30 мин)
```bash
# Настройка MSW для работы в Docker контейнере
# Создать src/mocks/server.ts с учетом Docker специфики
# Настроить handlers для API моков
# Интегрировать в main.ts с проверкой environment

# Особенности для Docker:
# - MSW работает в HTTP режиме (не HTTPS)
# - Service Worker доступен по правильному пути
# - Переменная окружения VITE_USE_MSW для включения
```

**Коммит:** `feat: setup msw for docker development environment

Time: 30 min`

### Шаг 1.13: Базовая настройка i18n (45 мин)
```bash
# Установка vue-i18n
bun add vue-i18n

# Создать базовую конфигурацию src/app/config/i18n.ts
# Создать placeholder файлы src/locales/ru.json и en.json
# Интегрировать в main.ts
# Настроить базовый LanguageSwitcher компонент

# Осознанный выбор: ранняя настройка для избежания рефакторинга
```

**Коммит:** `feat: setup basic i18n configuration

Time: 45 min`

### Шаг 1.14: Базовая конфигурация приложения (30 мин)
```bash
# Настройка main.ts с Pinia и persistedstate
# Создание базовой App.vue
# Проверка запуска приложения
```

**Коммит:** `feat: setup basic app configuration`

## Итерация 2: Базовая функциональность (6.5 часов)

### Шаг 2.1: Тесты для Documents Store (30 мин)
```bash
# Создать tests/unit/stores/documentsStore.test.ts
# Тесты для state, getters, actions
# Mock для API calls
describe('DocumentsStore', () => {
  it('should initialize with empty state', () => {})
  it('should search documents', async () => {})
  it('should select document', () => {})
})
```

**Коммит:** `test: add tests for documents store

Time: 30 min`

### Шаг 2.2: Создание базовых компонентов с loading states (1 час)
```bash
# Создать Loader.vue компонент для локального использования
# Добавить loading states в DocumentsList и DocumentSearch
# Создать базовый GlobalLoader (без overlay, только для будущей интеграции)
# Протестировать отображение loading при API вызовах
```

**Коммит:** `feat: create basic components with loading states

Time: 60 min`

### Шаг 2.2: Создание Documents Store (45 мин)
```bash
# Создать src/features/documents/stores/documentsStore.ts
# Интерфейсы Document, DocumentsState
# Actions: searchDocuments, selectDocument
# Getters: hasSelectedDocumentImage
# Запустить тесты: make test
```

**Коммит:** `feat: implement documents store with basic state management`

### Шаг 2.3: Тесты для DocumentSearch компонента (30 мин)
```bash
# Создать tests/unit/components/DocumentSearch.test.ts
describe('DocumentSearch', () => {
  it('should emit search event with debounced input', async () => {})
  it('should show loading state during search', () => {})
  it('should display error message', () => {})
})
```

**Коммит:** `test: add tests for document search component`

### Шаг 2.4: Создание DocumentSearch компонента (1 час)
```bash
# Создать src/features/documents/components/DocumentSearch.vue
# Реализовать debounce поиск (300ms)
# Интегрировать с DocumentsStore
# Добавить loading/error states
# Запустить тесты: make test
```

**Коммит:** `feat: implement document search component with debounce`

### Шаг 2.5: Тесты для DocumentsList компонента (30 мин)
```bash
# Создать tests/unit/components/DocumentsList.test.ts
describe('DocumentsList', () => {
  it('should render list of documents', () => {})
  it('should emit select event when document clicked', () => {})
  it('should show loading state', () => {})
})
```

**Коммит:** `test: add tests for documents list component`

### Шаг 2.6: Создание DocumentsList компонента (1 час)
```bash
# Создать src/features/documents/components/DocumentsList.vue
# Отображение списка документов
# Выбор документа
# Loading states
# Запустить тесты: make test
```

**Коммит:** `feat: implement documents list component`

### Шаг 2.7: Тесты для DocumentPreview компонента (30 мин)
```bash
# Создать tests/unit/components/DocumentPreview.test.ts
describe('DocumentPreview', () => {
  it('should display selected document', () => {})
  it('should show image when available', () => {})
  it('should not render when no document selected', () => {})
})
```

**Коммит:** `test: add tests for document preview component`

### Шаг 2.8: Создание DocumentPreview компонента (1 час)
```bash
# Создать src/features/documents/components/DocumentPreview.vue
# Отображение выбранного документа
# Показ изображения и контента
# Базовый layout (изображение слева, контент справа)
# Запустить тесты: make test
```

**Коммит:** `feat: implement document preview component`

### Шаг 2.9: Интеграция на главной странице (30 мин)
```bash
# Создать src/views/DocumentsPage.vue
# Импортировать компоненты через barrel exports
# Настроить общий layout (aside + main)
# Подключить к router
```

**Коммит:** `feat: integrate components on main documents page`

## Итерация 3: Расширенная функциональность (5.75 часов)

### Шаг 3.1: Тесты для скачивания документов (30 мин)
```bash
# Создать tests/unit/services/documentsService.test.ts
describe('DocumentsService', () => {
  it('should download document as blob', async () => {})
})
# Тесты для file utils
describe('fileUtils', () => {
  it('should generate txt file from document content', () => {})
})
```

**Коммит:** `test: add tests for document download functionality`

### Шаг 3.2: Реализация скачивания документов (1 час)
```bash
# Создать src/features/documents/services/documentsService.ts
# Метод downloadDocument с blob generation
# Создать утилиту для генерации .txt файла
# Интегрировать в DocumentActions компонент
# Запустить тесты: make test
```

**Коммит:** `feat: implement document download with txt file generation`

### Шаг 3.3: Тесты для удаления документов (30 мин)
```bash
# Добавить тесты для deleteDocument в documentsService.test.ts
describe('DocumentsService', () => {
  it('should delete document', async () => {})
})
# Тесты для DocumentActions компонента
describe('DocumentActions', () => {
  it('should show delete button only when document has image', () => {})
  it('should emit delete event with confirmation', () => {})
})
```

**Коммит:** `test: add tests for document deletion functionality`

### Шаг 3.4: Реализация удаления документов (45 мин)
```bash
# Добавить deleteDocument в DocumentsService
# Создать DocumentActions.vue компонент
# Добавить подтверждение удаления
# Условное отображение кнопки (только если есть изображение)
# Запустить тесты: make test
```

**Коммит:** `feat: implement document deletion with confirmation`

### Шаг 3.5: Тесты для персистентности (30 мин)
```bash
# Создать tests/unit/stores/uiStore.test.ts
describe('UIStore', () => {
  it('should persist theme changes', () => {})
})
# Создать tests/unit/stores/localeStore.test.ts
describe('LocaleStore', () => {
  it('should persist locale changes', () => {})
})
```

**Коммит:** `test: add tests for data persistence`

### Шаг 3.6: Настройка персистентности (1 час)
```bash
# Создать UIStore для темы
# Создать LocaleStore для языка
# Настроить persist в DocumentsStore для searchQuery
# Добавить инициализацию по умолчанию (системная тема, браузерный язык)
# Запустить тесты: make test
```

**Коммит:** `feat: setup data persistence for theme, locale and search query`

### Шаг 3.7: Финализация i18n переводов (45 мин)
```bash
# Заполнить все переводы для ru.json и en.json
# Настроить type-safe ключи
# Добавить fallback логику
# Протестировать переключение языков
```

**Коммит:** `feat: finalize i18n translations and type safety

Time: 45 min`

### Шаг 3.5: Создание GlobalLoader компонента (45 мин)
```bash
# Создать GlobalLoader.vue компонент с overlay и spinner
# Интегрировать с UIStore для глобального состояния загрузки
# Добавить CSS анимации и transitions
# Протестировать отображение при API вызовах
# Подключить в App.vue через Teleport
```

**Коммит:** `feat: implement global loader component with overlay

Time: 45 min`

### Шаг 3.6: Финализация тем (30 мин)
```bash
# Протестировать переключение тем на реальных компонентах
# Улучшить контрастность и доступность
# Добавить анимации переходов между темами
# Финализировать цветовую палитру
```

**Коммит:** `feat: finalize theme switching with component integration

Time: 30 min`

### Шаг 3.6: Финализация компонентов (30 мин)
```bash
# Добавить CSS Modules стили для всех компонентов
# Улучшить responsive layout
# Добавить базовую accessibility
```

**Коммит:** `feat: finalize components with styles and responsive design

Time: 30 min`

## Итерация 4: Развертывание и оптимизация (8.5 часов)

### Шаг 4.1: Production Docker (1 час)
```bash
# Создать docker/Dockerfile.prod
# Настроить nginx конфигурацию
# Добавить health checks
# Протестировать production build
```

**Коммит:** `feat: setup production docker with nginx`

### Шаг 4.2: Оптимизация bundle (1 час)
```bash
# Настроить code splitting в Vite
# Добавить lazy loading для компонентов
# Оптимизировать chunk sizes
# Настроить bundle analyzer
```

**Коммит:** `perf: optimize bundle with code splitting and lazy loading`

### Шаг 4.3: CI/CD с GitHub Actions (1 час)
```bash
# Создать .github/workflows/ci.yml
# Настроить тестирование, линтинг, сборку
# Создать .github/workflows/deploy.yml
# Настроить развертывание на GitHub Pages
```

**Коммит:** `ci: setup github actions for ci/cd`

### Шаг 4.4: Финализация качества кода и tooling (1.5 часа)
```bash
# Создать Makefile с командами
# Добавить README с инструкциями
# Финализировать package.json scripts
# Финализировать lint-staged конфигурацию
# Добавить html-validate для accessibility
# Протестировать pre-commit workflow
# Протестировать весь workflow
```

**Коммит:** `feat: finalize code quality, tooling and project setup`

### Шаг 4.5: Lighthouse и performance audit (30 мин)
```bash
# Настроить Lighthouse CI
# Провести performance аудит
# Оптимизировать Core Web Vitals
# Сгенерировать performance отчет
```

**Коммит:** `perf: setup lighthouse ci and performance audit`

### Шаг 4.6: Accessibility аудит (30 мин)
```bash
# Провести accessibility аудит
# Исправить WCAG AA compliance issues
# Добавить ARIA labels и keyboard navigation
# Протестировать с screen readers
```

**Коммит:** `feat: implement accessibility improvements`

### Шаг 4.7: Финализация тестирования (2 часа)
```bash
# Добавить E2E тесты с Playwright
# Настроить test coverage reporting
# Провести полный test suite
# Настроить test параллелизацию
```

**Коммит:** `test: setup e2e testing and coverage reporting`

### Шаг 4.8: Финализация проекта (30 мин)
```bash
# Финальный аудит кода
# Подготовка production deployment
# Создание финальной документации
# Проверка всех requirements
```

**Коммит:** `feat: finalize project and prepare for deployment`

## Резервное время (2 часа)

### Дополнительные задачи при необходимости:
- Исправление багов и рефакторинг
- Документация и README
- Performance оптимизации
- Accessibility улучшения

## Контрольные точки

**После итерации 1:** Проект собирается, dev server работает, инфраструктура настроена
**После итерации 2:** Базовый поиск и отображение работает (с тестами)
**После итерации 3:** Полная CRUD функциональность с персистентностью и i18n
**После итерации 4:** Production-ready с Docker, CI/CD, оптимизацией и полным тестированием

## Команды для каждого шага

```bash
# Запуск development сервера
make dev

# Запуск с Docker
make docker-dev

# Запуск тестов
make test

# Линтинг и форматирование
make lint-fix
make format

# Сборка для production
make build

# Анализ bundle
make build && open dist/bundle-analysis.html
```

## Альтернативные быстрые решения

### Для MSW в Docker (экономия 2-3 часа):
```bash
# Вместо MSW использовать простые mock данные
# Создать src/mocks/mockData.ts
export const mockDocuments = [...]
# Импортировать напрямую в store вместо API calls
```

### Для type-safe i18n (экономия 1 час):
```bash
# Упростить i18n без типов
// Вместо сложной типизации использовать базовый vue-i18n
```

### Для Prettier (экономия 30 мин):
```bash
# Убрать Prettier, оставить только ESLint для линтинга и базового форматирования
# ESLint справляется с основными правилами форматирования
```

### Для accessibility (экономия 2-3 часа):
```bash
# Базовая доступность вместо WCAG AA
# aria-label, keyboard navigation, semantic HTML
```

### Для performance (экономия 1-2 часа):
```bash
# Базовая оптимизация вместо deep analysis
# Lazy loading, code splitting, но без advanced metrics
```

### Для Storybook (экономия 2-3 часа):
```bash
# Пропустить Storybook для экономии времени
# Компоненты можно тестировать через Vitest + Vue Test Utils
# Фокус на core функциональности вместо tooling
```

### Альтернатива: Базовый Storybook (добавление 2 часов):
```bash
# Установка @storybook/vue3 + @storybook/vite
# Базовая конфигурация для 2-3 ключевых компонентов
# Stories для DocumentSearch, DocumentsList, DocumentPreview
# Демонстрация продвинутых навыков разработки UI
```

## Оптимизации времени разработки

### Оптимизированный режим (20-23 часов, экономия 2-5 часов):

#### 1. Упрощение тестирования (-2 часа)
```bash
# Вместо детальных unit тестов - интеграционные тесты
# Тестировать только критические компоненты
# Пропустить тесты для простых утилит
```

#### 2. Базовая i18n без типов (-1 час)
```bash
# Убрать type-safe переводы
# Использовать простой vue-i18n без TypeScript интеграции
# Переводы без строгой типизации ключей
```

#### 3. Упрощенные темы (-1 час)
```bash
# Только базовые CSS переменные
# Без сложного theme switcher в UIStore
# Простое переключение без персистентности
```

#### 4. Объединение шагов (-1-2 часа)
```bash
# Совместить настройку линтеров (ESLint + Stylelint в один шаг)
# Объединить создание компонентов с их стилизацией
# Пропустить отдельный шаг для структуры папок
```

#### 5. Минимум tooling (-1 час)
```bash
# Убрать Stylelint (только ESLint)
# Пропустить сложную настройку commitlint
# Базовые pre-commit hooks без кастомных правил
```

### Результат оптимизации:
- **Итерация 1**: 5.25-5.75 часов (вместо 7)
- **Итерация 2**: 4-5 часов (вместо 5.5)
- **Итерация 3**: 4-5 часов (вместо 5)
- **Итерация 4**: Без изменений (8.5 часов)

| Итерация | Оригинал | Оптимизировано | Экономия |
|----------|----------|---------------|----------|
| 1 (Настройка) | 7 ч | 5.25-5.75 ч | 1.25-1.75 ч |
| 2 (Функциональность) | 6.5 ч | 5-6 ч | 0.5-1.5 ч |
| 3 (Расширение) | 5.75 ч | 4.75-5.75 ч | 0-1 ч |
| 4 (Развертывание) | 8.5 ч | 8.5 ч | 0 ч |
| **Итого** | **27.75 ч** | **23-25.75 ч** | **2-4.75 ч** |


## Резюме архитектурной фазы:

✅ **Анализ требований** - Vue 3, TypeScript, Pinia, i18n, Docker
✅ **Структура проекта** - Feature-based с разделением ответственности
✅ **Архитектура stores** - 3 Pinia stores с персистентностью
✅ **Service layer** - API клиент с обработкой ошибок
✅ **i18n система** - Type-safe переводы ru/en (ранняя настройка)
✅ **Docker** - Development/Production с MSW (ранняя настройка для контейнера)
✅ **Качество кода** - ESLint (без Prettier), Stylelint, Husky, тестирование
✅ **Дизайн система** - SCSS переменные для двух тем (с базовым переключением)
✅ **Правила коммитов** - Conventional Commits с обязательным указанием времени
✅ **TDD план реализации** - 27.75 часов (оптимизированный 23-25.75), 35+ коммитов (тесты интегрированы в процесс разработки)

## Осознанный выбор технологий:

- **Vite**: Современный сборщик с быстрой разработкой и оптимизацией
- **Bun**: Быстрый пакетный менеджер и runtime
- **ESLint**: Достаточно для линтинга и базового форматирования (без Prettier)
- **TypeScript strict**: Максимальная типобезопасность
- **SCSS + CSS Modules**: Мощные стили с изоляцией
- **Дизайн токены**: Поддерживаемые переменные для тем с базовым переключением
- **Ранняя настройка i18n**: Избежание рефакторинга, правильная структура с первого дня
- **MSW в Docker**: Ранняя настройка для development в контейнерах
- **Гибкий план**: Возможность оптимизации до 18-20 часов при необходимости

## TDD Workflow (интегрирован в итерации 2-3):
1. **Red**: Написать failing тест перед реализацией фичи
2. **Green**: Реализовать минимальный код для прохождения теста
3. **Refactor**: Улучшить код без изменения функциональности
4. **Commit**: Зафиксировать изменения с указанием времени

Тестирование не выделено в отдельную итерацию - тесты пишутся параллельно с разработкой фичей, что соответствует принципам TDD.

Архитектура полностью готова. Готов перейти в Code режим для начала реализации с TDD?