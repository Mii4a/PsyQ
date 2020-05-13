<template lang="pug">
  div#app
    Header
    b-container(fluid)
      router-view
    Sidebar
</template>

<script>
import Sidebar from './components/Sidebar'
import Header from './components/Header'

export default {
  components: {
    Header, Sidebar
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Mandali&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
