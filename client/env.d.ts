/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Add this declaration for bootstrap-vue-3
declare module 'bootstrap-vue-3' {
  import { Plugin } from 'vue'
  export const BootstrapVue3: Plugin
}