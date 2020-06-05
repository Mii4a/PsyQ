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
  name: "QuestionAnswerButton",
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
    background-color: #fff;
    border-bottom: 1px solid #22bbaa;
    border-top: 1px solid #22bbaa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
    font-size: 1.1rem;
    margin-bottom: 10px;
    padding: 10px 20px;
    &__number {
      font-weight: bold;
      margin-right: 10px;
    }
  }
}
</style>
