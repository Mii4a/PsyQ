<template lang="pug">
  div#app
    b-container(fluid)
      router-view
    TheSidebar
</template>

<script>
import TheSidebar from '@/components/TheSidebar'


export default {
  components: {
    TheSidebar,
  },
  data() {
    return {
      value: ''
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Mandali&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
