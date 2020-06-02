<template lang="pug">
  div.psychology-index
    app-section-title(section-title="Category")
    div.psychology-index--container
      app-psychology-link(
        v-for="psychology in psychologies"
        :key="psychology.id"
        :query="psychology.field"
        :japanese-field-name="psychology.japanese_field_name"
        :font-awesome-icon="psychology.font_awesome_icon"
        :link-to="'/psychologies/' + `${psychology.id}`"
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
  mounted () {
    this.getPsychologies()
  },
  methods: {
    getPsychologies () {
      const field = this.$route.query.category
      const route = field + '_psychologies'
      const gettingUrl = process.env.VUE_APP_API + route
      this.$http.secured.get(
        gettingUrl
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
}
</script>
<style lang="scss" scoped>
.psychology-index {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
