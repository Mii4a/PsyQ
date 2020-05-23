<template lang="pug">
  div.psychology-index
    app-section-title(section-title="Category")
    div.psychology-index--container
      app-psychology-link(
        v-for="psychology in psychologies"
        :key="psychology.field"
        :query="psychology.field"
        :japanese-field-name="psychology.japanese_field_name"
        :font-awesome-icon="psychology.font_awesome_icon"
        link-to="/workbooks"
      )
    app-bottom-navigation
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppPsychologyLink from '@/components/AppPsychologyLink'
import AppSectionTitle from '@/components/AppSectionTitle'

export default {
  name: 'PsychologyIndex',
  components: {
    AppBottomNavigation,
    AppPsychologyLink,
    AppSectionTitle,
  },
  data () {
    return {
      psychologies: []
    }
  },
  methods: {
    getPsychologies () {
      const field = this.$route.query.category
      const route = field + '_psychologies'
      const gettingUrl = process.env.VUE_APP_API + route
      const params = {
        category: field,
      }
      this.$http.secured.get(
        gettingUrl,
        params
        ).then(
          response => this.psychologies = response.data
        ).catch(
          error => setError(error)
        )
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  },
  mounted () {
    this.getPsychologies()
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
