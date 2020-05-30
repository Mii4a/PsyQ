<template lang="pug">
  div.questions
    app-section-title(:section-title="restOfLimitTime")
    div.questions--container
      questions-correct-answer(
        v-if="showCorrectAnswer"
        :is-answer="isAnswer"
        :correct-answer="correctAnswer"
      )
      p.questions--container__number
        | {{ 'No.' + questionNumber }}
      span.questions--container__explanation
        | {{ showExplanation }}
    div.answer-form
      questions-answer-button(
        v-for="(choice, index) in choices"
        :key="choice.id"
        :option="choice.option"
        :number="answerNumber[index]"
        @click.native="checkAnswer(choice.is_answer)"
      )


</template>

<script>
import AppSectionTitle from '@/components/AppSectionTitle'
import QuestionsAnswerButton from '@/components/QuestionsAnswerButton'
import QuestionsCorrectAnswer from '@/components/QuestionsCorrectAnswer'

export default {
  name: "questions",
  components: {
    AppSectionTitle,
    QuestionsAnswerButton,
    QuestionsCorrectAnswer
  },
  data () {
    return {
      answers: [],
      answerNumber: ["A", "B", "C"],
      choices: [],
      correctAnswer: "",
      currentQuestion: [],
      error: "",
      explanation: [],
      explanationObj: null,
      isAnswer: "",
      limitTime: 60,
      limitTimeObj: null,
      questions: [],
      questionNumber: 1,
      showCorrectAnswer: false,
      splidExplanation: [],
      totalQuizNumber: 0,
    }
  },
  computed: {
    restOfLimitTime () {
      let limitTime = this.limitTime.toString()
      return limitTime
    },
    showExplanation () {
      let explanation = this.explanation.join('')
      return explanation
    },
    stringQuizNumber () {
      let quizNumber = this.quizNumber.toString()
      return quizNumber
    }
  },
  created () {
    this.getQuestionsFromWorkbooks()
    this.addExplanation()
    this.decreaseLimitTime()
  },
  methods: {
    async addExplanation () {
      let n = 0
      this.explanationObj = setInterval(() => {
        if (n <= this.splidExplanation.length) {
          this.explanation.push(this.splidExplanation[n])
          n++
        } else {
          clearInterval(this.explanationObj)
        }}, 100);
    },
    checkAnswer (choiceAnswer) {
      if (choiceAnswer) {
        this.showCorrectAnswer = true
        this.isAnswer = true
        this.stopExplanation()
        clearInterval(this.limitTimeObj)
      } else {
        this.showCorrectAnswer = true
        this.isAnswer = false
        this.stopExplanation()
        clearInterval(this.limitTimeObj)
      }
    },
    decreaseLimitTime () {
      this.limitTimeObj = setInterval(() => {
        if (this.limitTime > 0) {
          this.limitTime--
        } else {
          clearInterval(this.limitTimeObj)
          this.showCorrectAnswer = true
        }
      }, 1000)
    },
    getChoices (currentQuestionId) {
      const answers = this.answers
      const choices = answers.filter(answer => answer.question_id === currentQuestionId)
      this.choices = this.shuffleArray(choices)
    },
    async getQuestionsFromWorkbooks () {
      const workbookId = this.$route.query.workbook
      const gettingUrl = process.env.VUE_APP_API + 'workbooks/' + workbookId
      await this.$http.secured.get(gettingUrl).then((response) => {
        const questions = response.data.questions
        this.answers = response.data.answers
        this.questions = this.shuffleArray(questions)
        this.totalQuizNumber = this.questions.length
        this.currentQuestion = this.questions[this.questionNumber - 1]
        this.splidExplanation = this.currentQuestion.explanation.split('')
        this.getChoices(this.currentQuestion.id)
        this.correctAnswer = this.choices.find(el => el.is_answer === true).option
      }).catch(error => setError(error))
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    shuffleArray ([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        let r = Math.floor(Math.random() * (i + 1))
        let k = array[i]
        array[i] = array[r]
        array[r] = k
      }
      return array
    },
    stopExplanation () {
      clearInterval(this.explanationObj)
      this.explanation = this.currentQuestion.explanation.split('')
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-form {
  background-color: #22aabb;
  bottom: 0;
  padding-bottom: 2px;
  width: 100%;
}

.questions {
  &--container {
    background-color: #cfffcf;
    height: 140px;
    margin-bottom: 10px;
    padding: 10px 8%;
    &__number {
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
</style>
