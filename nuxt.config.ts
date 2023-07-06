// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // hooks: {
  //   'pages:extend' (pages) {
  //     // add a route
  //     pages.push({
  //       name: 'profile',
  //       path: '/profile',
  //       file: '~/pages/admin'
  //     })
  //   }
  // },

  ssr: true, // Enable server-side rendering
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  app: {
    head: {
      // <title>Educative survey application</title>
      title: 'Educative survey application',
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        // <meta name="title" content="Educative survey application">
        {
          name: 'title',
          content: 'Educative survey application'
        },
        // <meta name="description" content="Create engaging surveys using our application">
        {
          name: 'description',
          content: 'Create engaging surveys using our application'
        }
      ],
      script: [
        // <script src=""></script>
        { src: '' }
      ],
      link: [
        // <link rel="" href="">
        { rel: '', href: '' }
      ],
      // please note that this is an area that is likely to change
      style: [
        // <style></style>
        {
          children: ''
        }
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        // { children: 'JavaScript is required' }
      ]
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  runtimeConfig: {
    surveyApiUrl: process.env.SURVEY_API_URL
  }
})
