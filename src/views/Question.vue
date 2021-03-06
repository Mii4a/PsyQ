<template lang="pug">
  div.question
    question-header(
      :basic-category="basicCategory"
      :category="category"
      :currentQuestionNumber="currentQuestionNumber"
      :limit-time="limitTime"
      :path="setWayBackwithParams"
      :totalQuestionNumber="totalQuestionNumber"
      @click-exit="switchExit"
    )
    question-exit-form(
      v-if="exitObj"
      :basicCategory="basicCategory"
      :category="category"
      :path="setWayBackwithParams"
      @not-exit="switchExit"
    )
    div.question--container(
      v-if="!exitObj"
    )
      p.question--container__explanation
        | {{ showExplanation }}
      question-correct-answer(
        v-if="showCorrectAnswer"
        :correct-answer="correctAnswer"
        :current-question-number="currentQuestionNumber"
        :is-answer="isAnswer"
        :next-time="nextTime"
        :total-question-number="totalQuestionNumber"
        )
      div.answer-form
        question-answer-button(
          v-for="(choice, index) in choices"
          :key="choice.id"
          :option="choice.option"
          :number="answerNumber[index]"
          @click.native="checkAnswer(choice.is_answer)"
        )
</template>

<script>
import QuestionAnswerButton from '@/components/QuestionAnswerButton'
import QuestionCorrectAnswer from '@/components/QuestionCorrectAnswer'
import QuestionExitForm from '@/components/QuestionExitForm'
import QuestionHeader from '@/components/QuestionHeader'


export default {
  name: "Question",
  components: {
    QuestionAnswerButton,
    QuestionCorrectAnswer,
    QuestionExitForm,
    QuestionHeader
  },
  data () {
    return {
      answers: [],
      answerNumber: ["A", "B", "C"],
      basicCategory: this.$route.query.basicCategory,
      category: this.$route.query.category,
      choices: [],
      correctAnswer: "",
      correctAnswerCount: 0,
      currentQuestion: [],
      currentQuestionNumber: 1,
      error: "",
      exitObj: false,
      explanation: [],
      explanationObj: null,
      isAnswer: false,
      limitTime: 30,
      limitTimeObj: null,
      nextTime: 5,
      nextTimeObj: null,
      psychologyId: 0,
      questions: [],
      showCorrectAnswer: false,
      splidExplanation: [],
      totalQuestionNumber: 0,
      wayBack: '/psychologies',
      workbook: []
    }
  },
  computed: {
    setWayBackwithParams () {
      const route = this.wayBack
      const params = this.psychologyId
      const paramsRoute = route + '/' + params
      return paramsRoute
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
  created() {
    this.getQuestionsFromWorkbooks()
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    addExplanation () {
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
      if (!this.showCorrectAnswer) {
        if (choiceAnswer) {
          this.isAnswer = true
          this.correctAnswerCount++
        } else {
          this.isAnswer = false
        }
        this.showCorrectAnswer = true
        this.showEntireExplanation()
        clearInterval(this.limitTimeObj)
        this.countUntilNextQuestion()
      }
    },
    checkSignedIn () {
      if (!localStorage.signedIn) {
        this.$router.replace({
          path: '/signin',
          query: {
            expired: true
          }
        })
      }
    },
    countUntilNextQuestion () {
      this.nextTimeObj = setInterval(() => {
        if (this.nextTime > 0) {
          this.nextTime--
        } else {
          clearInterval(this.nextTimeObj)
          this.nextQuestion()
        }
      }, 1000);
    },
    decreaseLimitTime () {
      this.limitTimeObj = setInterval(() => {
        if (this.limitTime > 0) {
          this.limitTime--
        } else {
          clearInterval(this.limitTimeObj)
          this.showCorrectAnswer = true
          this.isAnswer = false
          this.countUntilNextQuestion()
        }
      }, 1000)
    },
    switchExit () {
      const exit = this.exitObj
      if (exit) {
        this.exitObj = false
        this.decreaseLimitTime()
      } else {
        this.exitObj = true
        clearInterval(this.limitTimeObj)
      }
    },
    getChoices () {
      const answers = this.answers
      const currentQuestionId = this.currentQuestion.id
      const choices = answers.filter(answer => answer.question_id === currentQuestionId)
      this.choices = this.shuffleArray(choices)
    },
    async getQuestionsFromWorkbooks () {
      const workbookId = this.$route.query.workbook
      const gettingUrl = process.env.VUE_APP_API + 'workbooks/' + workbookId
      await this.$http.secured.get(gettingUrl).then((response) => {
        const questions = response.data.questions
        this.answers = response.data.answers
        this.workbook = response.data.workbook
        this.psychologyId = this.workbook.psychology_id
        this.questions = this.shuffleArray(questions)
        this.totalQuestionNumber = this.questions.length
        this.setCurrentQuestion()
      }).catch(error => setError(error))
    },
    nextQuestion () {
      if (this.currentQuestionNumber < this.totalQuestionNumber) {
        this.currentQuestionNumber++
        this.setCurrentQuestion()
      } else {
        this.$router.push({
          path: '/result',
          query: {
            correctAnswerCount: this.correctAnswerCount,
            totalQuestionNumber: this.totalQuestionNumber,
            psychologyId: this.psychologyId
        }})
      }
    },
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    setCurrentQuestion () {
      this.currentQuestion = this.questions[this.currentQuestionNumber - 1]
      this.explanation = []
      this.limitTime = 30
      this.nextTime = 5
      this.showCorrectAnswer = false
      this.splidExplanation = this.currentQuestion.explanation.split('')
      this.getChoices()
      this.correctAnswer = this.choices.find(el => el.is_answer === true).option
      this.addExplanation()
      this.decreaseLimitTime()
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
    showEntireExplanation () {
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

.question {
  &--container {
    &__explanation {
      background-color: rgba(0, 0, 0, .1);
      font-size: 1rem;
      margin-bottom: 10px;
      min-height: 100px;
      padding: 15px 8%;
    }
    &__number {
      font-weight: bold;
      margin-bottom: 5px;
      text-align: center;
    }
  }
}
</style>
