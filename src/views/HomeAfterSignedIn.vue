<template lang="pug">
  div.signed-home
    app-section-title(section-title="Home")
    div.signed-home--container
      app-psychology-link(
        v-for="psychology in psychologies"
        :key="psychology.field"
        :basic-category="psychology.category"
        :japanese-field-name="psychology.field"
        :font-awesome-icon="psychology.fontAwesomeIcon"
        link-to="/psychologies"
      )
    app-bottom-navigation
</template>

<script>
import axios from 'axios'
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppPsychologyLink from '@/components/AppPsychologyLink'
import AppSectionTitle from '@/components/AppSectionTitle'

export default{
  name: 'HomeAfterSignedIn',
  components: {
    AppBottomNavigation,
    AppPsychologyLink,
    AppSectionTitle
  },
  data() {
    return {
      error: '',
      psychologies: [
        {
          category: 'basic',
          field: '基礎',
          fontAwesomeIcon: 'graduation-cap',
          linkTo: '/basic-psychology'
        },
        {
          category: 'applied',
          field: '応用',
          fontAwesomeIcon: 'users',
          linkTo: '/applied-psychology'
        }
      ]
    }
  },
  mounted() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    checkSignedIn() {
      if (!localStorage.signedIn) {
        this.$router.replace({
          path: '/signin',
          query: {
            expired: true
          }
        })
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.signed-home {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
