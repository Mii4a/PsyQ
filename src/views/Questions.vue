<template lang="pug">
  div.questions
    app-section-title(:section-title="restOfLimitTime")
    div.questions--container
      div.
    div.answer-form
      questions-answer-button(
        v-for="(answer, index) in displayingAnswers"
        :key="answer.id"
        :option="answer.option"
        :number="answerNumber[index]"
      )

</template>

<script>
import AppSectionTitle from '@/components/AppSectionTitle'
import QuestionsAnswerButton from '@/components/QuestionsAnswerButton'

export default {
  name: "questions",
  components: {
    AppSectionTitle,
    QuestionsAnswerButton
  },
  data () {
    return {
      answers: {},
      answerNumber: ["A", "B", "C"],
      correctAnswer: false,
      displayingAnswers: [],
      error: "",
      limitTime: 60,
      questions: [],
      quizNumber: 1,
    }
  },
  computed: {
    restOfLimitTime () {
      let limitTime = this.limitTime.toString()
      return limitTime
    },
    stringQuizNumber () {
      let quizNumber = this.quizNumber.toString()
      return quizNumber
    }
  },
  created () {
    this.getQuestionsFromWorkbooks()
    this.decreaseLimitTime()
  },
  methods: {
    decreaseLimitTime () {
      setInterval(() => {
        if (this.limitTime > 0) {
          this.limitTime--
        } else {
          clearInterval()
          this.correctAnswer = true
        }
      }, 1000)
    },
    getQuestionsFromWorkbooks () {
      const workbookId = this.$route.query.workbook
      const gettingUrl = process.env.VUE_APP_API + 'workbooks/' + workbookId
      this.$http.secured.get(gettingUrl).then((response) => {
        this.questions = response.data.questions,
        this.answers = response.data.answers
        this.displayingAnswers = this.answers["1"]
      })
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  }
}
</script>

<style lang="scss" scoped>
.answer-form {
  bottom: 0;
  position: fixed;
  width: 100%;
}

</style>
