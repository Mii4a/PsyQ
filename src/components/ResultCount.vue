<template lang="pug">
  h1.result-count
    div.counts
      span.total-question-number
        | {{ totalQuestionNumber }}
      span.counts-message
        | 問中
      | {{ correctAnswerCount }}
      span.counts-message
        | 点
</template>

<script>
export default {
  name: "ResultCount",
  props: {
    correctAnswerCount: {
      type: String,
      required: true
    },
    totalQuestionNumber: {
      type: String,
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.result-count {
  font-size: 2rem;
  font-weight: bold;
  padding-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  .counts {
    display: inline-block;
    .counts-message {
      bottom: 5px;
      color: #a8a8a8;
      font-size: 1rem;
      padding: 0 10px;
    }
    .total-question-number {
      font-size: 1.4rem;
    }
  }
}
</style>
