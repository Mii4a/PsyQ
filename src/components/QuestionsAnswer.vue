<template lang="pug">
div.answer
  div.answer--container(
      :class="{ correctBgColor: isAnswer, uncorrectBgColor: !isAnswer}"
    )
    div.result(
      :class="{ correctColor: isAnswer, uncorrectColor: !isAnswer}"
    )
      span.result--icon
        font-awesome-icon(
            :icon="[`fas`, answerIcon]"
          )
      span.result--message
        | {{ messageCorrectOrWrong }}
      span.next-time
        | {{ nextTimeMessage + nextTime }}
    div.correct-answer
      | {{ '答え：' + correctAnswer }}
</template>

<script>
export default {
  name: "QuestionsAnswer",
  props: {
    correctAnswer: {
      type: String,
      requierd: true
    },
    currentQuestionNumber: {
      type: Number,
      required: true
    },
    isAnswer: {
      type: Boolean,
      required: true,
      default: false
    },
    nextTime: {
      type: Number,
      required: true,
      default: 5
    },
    totalQuestionNumber: {
      type: Number,
      required: true,
    }
  },
  computed: {
    answerIcon () {
      const answerIcon = (this.isAnswer) ? 'check-circle' : 'times-circle'
      return answerIcon
    },
    messageCorrectOrWrong () {
      if (this.isAnswer) {
        const correctAnswerMessage = '正解'
        return correctAnswerMessage
      } else {
        const wrongAnswerMessage = '不正解'
        return wrongAnswerMessage
      }
    },
    nextTimeMessage () {
      const currentNumber = this.currentQuestionNumber
      const lastNumber = this.totalQuestionNumber
      const nextTimeMessage = (
        (currentNumber === lastNumber)
        ? 'リザルト画面まで\n'
        : '次の問題まで\n'
      )
      return nextTimeMessage
    }
  }
}
</script>

<style lang="scss" scoped>
.answer {
  margin-bottom: 10px;
  min-height: 60px;
  width: 100%;
  &--container {
    display: inline-block;
    font-weight: bold;
    padding: 0 8%;
    width: 100%;
  }
}

.correctBgColor {
  background-color: rgba(221, 255, 221, 1)
}

.correctColor {
  color: #22bbaa;
}

.result {
  &--icon {
    font-size: 1.4rem;
    margin-right: 10px;
  }
  &--message {
    font-size: 1rem;
    margin-right: 10px;
  }
  .next-time {
    color: #8a8a8a;
    font-size: .8rem;
    font-weight: normal;
  }
}

.uncorrectBgColor {
  background-color: rgba(250, 202, 200, .8);
}

.uncorrectColor {
  color: #f44311;
}
</style>
