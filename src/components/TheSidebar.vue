<template lang="pug">
  div
    b-sidebar#sidebar-right(title="PSYCHOLO" right shadow)
      div.px-3.py-2
        router-link(to='/workbooks')
          |
        router-link(to='/workbooks')
          | About
        router-link(to='/workbooks')
          | Home
        div(@click="signOut")
          | logout
</template>

<script>
export default{
  name: "TheSidebar",
  methods: {
    signOut() {
      this.$http.secured.delete(process.env.VUE_APP_API + `logout`, {
         headers: {'Authorization': 'Bearer ' + process.env.VUE_APP_API_TOKEN}
         }).then(response => {
           delete localStorage.csrf
           delete localStorage.signedIn
           this.$router.replace('/')
         }).catch(error => {
           this.setError(error, 'Cannot sign out')
         })
    },
  }
}
</script>
