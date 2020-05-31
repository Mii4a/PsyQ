<template lang="pug">
  div.questions
    questions-header(
      :currentQuestionNumber="currentQuestionNumber"
      :limit-time="restOfLimitTime"
      :totalQuestionNumber="totalQuestionNumber"
    )
    div.questions--container
      p.questions--container__explanation
        | {{ showExplanation }}
    questions-answer(
        v-if="showCorrectAnswer"
        :correct-answer="correctAnswer"
        :is-answer="isAnswer"
      )
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
import QuestionsHeader from '@/components/QuestionsHeader'
import QuestionsAnswerButton from '@/components/QuestionsAnswerButton'
import QuestionsAnswer from '@/components/QuestionsAnswer'

export default {
  name: "questions",
  components: {
    QuestionsAnswerButton,
    QuestionsAnswer,
    QuestionsHeader
  },
  data () {
    return {
      answers: [],
      answerNumber: ["A", "B", "C"],
      choices: [],
      correctAnswer: "",
      currentQuestion: [],
      currentQuestionNumber: 1,
      error: "",
      explanation: [],
      explanationObj: null,
      isAnswer: "",
      limitTime: 60,
      limitTimeObj: null,
      questions: [],
      showCorrectAnswer: false,
      splidExplanation: [],
      totalQuestionNumber: 0,
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
  },
  mounted () {
    this.addExplanation()
    this.decreaseLimitTime()
  },
  methods: {
    addExplanation () {
      let n = 0
      this.explanationObj = setInterval(() => {
        if (n <= this.splidExplanation.length) {
          console.log(n)
          this.explanation.push(this.splidExplanation[n])
          n++
        } else {
          clearInterval(this.explanationObj)
        }}, 100);
    },
    checkAnswer (choiceAnswer) {
      this.showCorrectAnswer = true
      choiceAnswer ? this.isAnswer = true  : this.isAnswer = false
      this.stopExplanation()
      clearInterval(this.limitTimeObj)
      this.nextQuestion()
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
    getChoices () {
      const answers = this.answers
      const currentQuestionId = this.currentQuestion.id
      const choices = answers.filter(answer => answer.question_id === currentQuestionId)
      this.choices = this.shuffleArray(choices)
    },
    setCurrentQuestion () {
      this.currentQuestion = this.questions[this.currentQuestionNumber - 1]
      this.explanation = []
      this.limitTime = 60
      this.showCorrectAnswer = false
      this.splidExplanation = this.currentQuestion.explanation.split('')
      this.getChoices()
      this.correctAnswer = this.choices.find(el => el.is_answer === true).option
    },
    async getQuestionsFromWorkbooks () {
      const workbookId = this.$route.query.workbook
      const gettingUrl = process.env.VUE_APP_API + 'workbooks/' + workbookId
      await this.$http.secured.get(gettingUrl).then((response) => {
        const questions = response.data.questions
        this.answers = response.data.answers
        this.questions = this.shuffleArray(questions)
        this.totalQuestionNumber = this.questions.length
        this.setCurrentQuestion()
      }).catch(error => setError(error))
    },
    nextQuestion () {
      setTimeout(() => {
        if (this.currentQuestionNumber <= this.totalQuestionNumber) {
          this.currentQuestionNumber++
          this.setCurrentQuestion()
          this.addExplanation()
        } else {
          this.$router.replace('')
        }
      }, 5000)
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
  padding-bottom: 2px;
  width: 100%;
}

.questions {
  &--container {
    &__explanation {
      background-color: rgba(0, 0, 0, .1);
      font-size: 1rem;
      margin-bottom: 10px;
      min-height: 100px;
      padding: 10px 8%;
    }
    &__number {
      font-weight: bold;
      margin-bottom: 5px;
      text-align: center;
    }
  }
}
</style>
