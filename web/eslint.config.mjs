// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Permite nomes de arquivos simples como index.vue e [id].vue
    'vue/multi-word-component-names': 'off'
  }
})
