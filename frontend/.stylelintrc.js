module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'config'
        ]
      }
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen']
      }
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['text-wrap']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'value-keyword-case': null,
    'custom-property-pattern': null,
    'selector-id-pattern': null,
    'selector-class-pattern': null
  },
  ignoreFiles: ['node_modules/**/*', 'dist/**/*', '.next/**/*']
}