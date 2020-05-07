<template lang="pug">
  div.home.container
    div.home-title
      h1.home-title_logo PSYCHOLO
      p  Welcome to PSYCHOLO

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
.home-title_logo {
  font-family: 'Mandali', sans-serif;
}
</style>
