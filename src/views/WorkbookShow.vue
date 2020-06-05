<template lang="pug">
  div.workbook-show
    app-section-title(
      section-title="Workbook"
      )
    app-loading(
      v-if="loading"
      )
    div.workbook-show--container(
      v-if="!loading"
    )
      div.workbook-information
        div.workbook-information--name
          span.workbook-information--name__bracket.bracket-left()
          | {{ workbook.subject_name }}
          span.workbook-information--name__bracket.bracket-right
        div.explanation-before-starting
          span {{ "問題数は" + workbook.questions_count + "問です" }}
          p {{ "一題ごとの制限時間は30秒です" }}
      app-question-start-button(
        :workbook-id="workbookId"
        )
    app-bottom-navigation
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppLoading from '@/components/AppLoading'
import AppSectionTitle from '@/components/AppSectionTitle'
import AppQuestionStartButton from '@/components/AppQuestionStartButton'

export default {
  name: 'WorkbookShow',
  components: {
    AppBottomNavigation,
    AppLoading,
    AppSectionTitle,
    AppQuestionStartButton
  },
  data () {
    return {
      loading: true,
      workbookId: this.$route.params['id'],
      workbook: [],
      questions: []
    }
  },
  created () {
    this.getWorkbookAndQuestions()
  },
  methods: {
    async getWorkbookAndQuestions () {
      const workbookId = this.$route.params['id']
      const gettingUrl = process.env.VUE_APP_API + 'workbooks/' + workbookId
      await this.$http.secured.get(
        gettingUrl
      ).then((response) => {
        this.workbook = response.data.workbook
        this.questions = response.data.questions
        this.loading = false
      }).catch(
        error => setError(error)
      )
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    }
  },
}
</script>

<style lang="scss" scoped>
.workbook-information{
  &--name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
    padding: 5px 25px;
    position: relative;
    text-align: center;
    &__bracket {
      display: inline-block;
      height: 20px;
      width: 25px;
    }
    .bracket-left {
      border-top: 5px solid #22aabb;
      border-left: 5px solid #22aabb;
      left: 5px;
      position: absolute;
      top: -5px;
    }
    .bracket-right {
      border-bottom: 5px solid #22aabb;
      border-right: 5px solid #22aabb;
      bottom: 0;
      position: absolute;
      right: 5px;
    }
  }
}
.workbook-show {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
