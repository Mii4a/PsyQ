<template lang="pug">
div.correct-answer
  div.correct-answer--container
    div
    font-awesome-icon(
      v-if="isAnswer"
      :icon="[`fas`, `check-circle`]"
      )
    span
      | {{ correctAnswer }}
</template>

<script>
export default {
  name: "correctAnswer",
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
  }
}
</script>

<style lang="scss" scoped>
</style>
