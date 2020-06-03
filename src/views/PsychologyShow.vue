<template lang="pug">
  div.psychology-show
    app-section-title(
      section-title="Selects"
      )
    div.psychology-show--container
      app-workbook-link(
        v-for="workbook in workbooks"
        :key="workbook.id"
        :id="workbook.id"
        :subject-name="workbook.subject_name"
        :questions-count="workbook.questions_count"
      )
    app-bottom-navigation
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppSectionTitle from '@/components/AppSectionTitle'
import AppWorkbookLink from '@/components/AppWorkbookLink'

export default {
  name: "PsychologyShow",
  components: {
    AppBottomNavigation,
    AppSectionTitle,
    AppWorkbookLink
  },
  data () {
    return {
      psychology: [],
      workbooks: []
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
    },
    getPsychologyAndWorkbooks () {
      const psychologyId = this.$route.params['id']
      const gettingUrl = process.env.VUE_APP_API + '/psychologies/' + psychologyId
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
    this.getPsychologyAndWorkbooks()
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
