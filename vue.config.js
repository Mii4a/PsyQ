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
              maxAgeSeconds: 86400
            },
            cacheableResponse: {
              statuses: [
                0,
                200
              ]
            }
          }
        }
      ]
    },
    name: 'PSYCHOLO'
  },
};
