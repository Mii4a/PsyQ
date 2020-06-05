<template lang="pug">
div.question-header
  div.question-header--container.exit(
    @click="clickExit"
  )
    b-icon-x-circle.question-header--container__icon
  div.question-header--container.limit-time
    | {{ limitTime }}
  div.question-header--container.question-number
    span.question-number
      | {{ currentQuestionNumber + '/' + totalQuestionNumber }}
</template>

<script>
export default {
  name: "QuestionHeader",
  data () {
    return {
      exit: false
    }
  },
  props: {
    currentQuestionNumber: {
      type: Number,
      require: true,
      default: 0
    },
    limitTime: {
      type: Number,
      required: true,
      default: 30
    },
    totalQuestionNumber: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    clickExit () {
      this.$emit('click-exit')
    }
  }
}
</script>

<style lang="scss" scoped>
.question-header {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 0 8px 8px rgba(0, 0, 0, .1);
  display: flex;
  height: 40px;
  padding: 5px 10px 0;
  &--container {
    display: inline-block;
    width: 33%;
    &__icon {
      color: #555;
    }
  }
  .exit {
    font-size: 1.4rem;
    padding-left: 5px;
  }
  .limit-time {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
  }
  .question-number {
    font-size: 1.2rem;
    padding-top: 2px;
    text-align: right;
  }
}
</style>
