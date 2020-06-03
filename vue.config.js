module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/global.scss";'
      }
    }
  },
  pwa: {
    workboxOptions: {
      runtimeCaching: [
        {
          urlPattern: /https:\/api\/.+/,
          handler: 'networkFirst',
          options: {
            cacheName: 'api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  },
};
