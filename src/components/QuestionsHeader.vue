<template lang="pug">
div.questions-header
  div.questions-header--container.
  div.questions-header--container.limit-time
    | {{ limitTime }}
  div.questions-header--container.question-number
    span.question-number
      | {{ currentQuestionNumber + '/' + totalQuestionNumber}}
</template>

<script>
export default {
  name: "questionsHeader",
  props: {
    currentQuestionNumber: {
      type: Number,
      require: true
    },
    limitTime: {
      type: String,
      required: true
    },
    totalQuestionNumber: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-header {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  box-shadow: 0 8px 8px rgba(0, 0, 0, .1);
  display: flex;
  height: 40px;
  padding: 5px 10px 0;
  &--container {
    display: inline-block;
    width: 33%;
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
