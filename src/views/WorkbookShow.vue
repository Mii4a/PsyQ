<template lang="Pug">
</template>
<script>
export default {
  name: 'WorkbookShow',
  data() {
    return {
      workbook: [],
      questions: []
    }
  },
  created () {
    this.getWorkbookAndQuestions
  },
  methods: {
    getWorkbookAndQuestions () {
      const workbookId = this.$route.params['id']
      const gettingUrl = process.env.VUE_APP_API + 'workbooks/' + workbookId
      this.$http.secured.get(
        gettingUrl
      ).then((response) => {
        this.workbook = response.data.workbook
        this.questions = response.data.questions
      }).catch(
        error => setError(error)
      )
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  },
}
</script>
