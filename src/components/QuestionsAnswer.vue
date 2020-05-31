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
    isAnswer: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  computed: {
    answerIcon () {
      if (this.isAnswer) {
        const correctAnswerIcon = 'check-circle'
        return correctAnswerIcon
      } else {
        const wrongAnswerIcon = 'times-circle'
        return wrongAnswerIcon
      }
    },
    messageCorrectOrWrong () {
      if (this.isAnswer) {
        const correctAnswerMessage = '正解'
        return correctAnswerMessage
      } else {
        const wrongAnswerMessage = '不正解'
        return wrongAnswerMessage
      }
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
  }
}

.uncorrectBgColor {
  background-color: rgba(250, 202, 200, .8);
}

.uncorrectColor {
  color: #f44311;
}
</style>
