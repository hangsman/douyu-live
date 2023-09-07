// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite:{
    vue:{
      customElement:true,
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
