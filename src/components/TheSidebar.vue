<template lang="pug">
  div
    b-sidebar#sidebar-right(title="PSYCHOLO" right shadow)
      div.px-3.py-2
        div.home-link
          the-sidebar-link(
            :link-name="homeLink.linkName"
            :font-awesome-icon="homeLink.fontAwesomeIcon"
            :link-to="homeLink.linkTo"
          )
        div.psychology-link
          the-sidebar-link(
            v-for="psychology in psychologyLink"
            :key="psychology.linkName"
            :link-name="psychology.linkName"
            :font-awesome-icon="psychology.fontAwesomeIcon"
            :query="psychology.query"
            link-to="/psychologies"
          )
        div.logout-link(
          @click="logout"
        )
          the-sidebar-logout-link
</template>

<script>
import TheSidebarLink from '@/components/TheSidebarLink'
import TheSidebarLogoutLink from '@/components/TheSidebarLogoutLink'

export default{
  name: "TheSidebar",
  components: {
    TheSidebarLink,
    TheSidebarLogoutLink
  },
  data () {
    return {
      homeLink: {
        linkName: 'HOME',
        fontAwesomeIcon: 'home',
        linkTo: '/home'
      },
      psychologyLink: [
        {
          linkName: '基礎心理学',
          query: 'basic',
          fontAwesomeIcon: 'graduation-cap',
        },
        {
          linkName: '応用心理学',
          query: 'applied',
          fontAwesomeIcon: 'users',
        }
      ]
    }
  },
  methods: {
    logout() {
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
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  }
}
</script>
