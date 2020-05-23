<template lang="pug">
  div.psychology-show
    app-section-title(section-title="Workbooks")
    div.psychology-show--container
    app-bottom-navigation
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppSectionTitle from '@/components/AppSectionTitle'


export default {
  name: "PsychologyShow",
  components: {
    AppBottomNavigation,
    AppSectionTitle
  },
  data () {
    return {
      id: this.$route.params['id'],
      psychology: [],
      workbooks: []
    }
  },
  methods: {
    getWorkbooks () {
      const gettingUrl = process.env.VUE_APP_API + '/psychologies/' + this.id
      this.$http.secured.get(
        gettingUrl
        ).then(
          response => {
            this.psychology = response.data.psychology
            this.workbooks = response.data.workbooks
          }
        ).catch(
          error => setError(error)
        )
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  },
  created () {
    this.getWorkbooks()
  }
}
</script>

<style lang="scss" scoped>
.psychology-show {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
