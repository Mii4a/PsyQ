<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>{{ this.info }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      info: ''
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    axios.get(process.env.VUE_APP_API + 'users',{
      headers: {
        'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN
      }
    }).then(response => {
      this.info = response
    })
  }
}
</script>
