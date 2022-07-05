export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'draw',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  ssr: false,

  css: [
    '~/public/style.css',
  ],

  plugins: [
    { src: '~/plugins/default.js' },
  ],

  serverMiddleware: {
    '/myapp': '~/server/peerServer',
  },

  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  
  build: {
    optimization: {
      minimize: false, // disable all minimizers for build time reduction on digital ocean
    },
    extend(config) {
      config.module.rules.push({
        test: /\.(frag|vert|glsl)$/,
        use: 'raw-loader',
      });
    }
  }

}
