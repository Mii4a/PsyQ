<template lang="pug">
  div.psychology-index
    app-section-title(section-title="Category")
    app-loading(
      v-if="loading"
    )
    div.psychology-index--container(
      v-if="!loading"
    )
      app-psychology-link(
        v-for="psychology in psychologies"
        :basic-category="basicCategory"
        :key="psychology.id"
        :category="psychology.field"
        :japanese-field-name="psychology.japanese_field_name"
        :font-awesome-icon="psychology.font_awesome_icon"
        :link-to="'/psychologies/' + `${psychology.id}`"
      )
    app-bottom-navigation
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppLoading from '@/components/AppLoading'
import AppPsychologyLink from '@/components/AppPsychologyLink'
import AppSectionTitle from '@/components/AppSectionTitle'

export default {
  name: 'PsychologyIndex',
  components: {
    AppBottomNavigation,
    AppLoading,
    AppPsychologyLink,
    AppSectionTitle,
  },
  data () {
    return {
      basicCategory: this.$route.query.basicCategory,
      error: '',
      errorObj: null,
      loading: true,
      psychologies: [],
    }
  },
  created () {
    this.checkSignedIn()
    this.getPsychologies()
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
    },
    async getPsychologies () {
      const basicCategory = this.$route.query.basicCategory
      const route = basicCategory + '_psychologies'
      const gettingUrl = process.env.VUE_APP_API + route
      await this.$http.secured.get(
        gettingUrl
        ).then(response => {
          this.psychologies = response.data
          this.loading = false
        }).catch(
          error => this.setError(error)
        )
    },
    setError(error, text) {
      this.errorObj = true
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  },
}
</script>
<style lang="scss" scoped>
.psychology-index {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
