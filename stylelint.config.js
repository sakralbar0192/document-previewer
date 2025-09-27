export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss'
  ],
  rules: {
    // CSS class naming pattern - kebab-case for regular classes
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$',

    // Custom properties (CSS variables)
    'custom-property-pattern': '^--[a-z][a-zA-Z0-9]*(-[a-z][a-zA-Z0-9]*)*$',

    // SCSS variables and placeholders
    'scss/dollar-variable-pattern': '^_[a-z][a-zA-Z0-9]*$',
    'scss/percent-placeholder-pattern': '^_[a-z][a-zA-Z0-9]*$',

    // Allow CSS custom properties in unknown properties
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['/^--/']
      }
    ],


    // No empty blocks
    'block-no-empty': true,

    // Allow empty sources in Vue files
    'no-empty-source': null,

    // Color functions
    'color-function-notation': 'modern',

    // Units
    'unit-allowed-list': ['px', 'em', 'rem', '%', 'vh', 'vw', 'vmin', 'vmax', 'deg', 's', 'ms'],

  }
}
