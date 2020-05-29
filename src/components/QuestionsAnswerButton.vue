<template lang="pug">
div.answer-button
  div.answer-button--container
    span.answer-button--container__number
      | {{ number }}.
    span.answer-button--container__option
      | {{ option }}
</template>

<script>
export default {
  name: "QuestionsAnswerButton",
  props: {
    option: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.answer-button {
  &--container {
    border-top: 2px solid #555;
    font-size: 1.1rem;
    padding: 10px 20px;
    &__number {
      font-weight: bold;
      margin-right: 10px;
    }
  }
}
</style>
