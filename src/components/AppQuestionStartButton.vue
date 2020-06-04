<template lang="pug">
div.question-start-button
  div.question-start-button--container
    router-link(
      :to="{path: `/question`, query: { workbook: `${workbookId}`}}"
      )
      p.question-start-button--container__message
        |  スタート
</template>

<script>
export default {
  name: "AppQuestionStartButton",
  props: {
    workbookId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.question-start-button {
  padding-top: 15px;
  &--container {
    border: 4px solid #22aabb;
    padding: 20px 10px 10px;
    text-align: center;
    &__icon {
      font-size: 2rem;
      margin-bottom: 5px;
    }
    &__message {
      font-size: 1.2rem;
      font-weight: bold;
      text-decoration: none;
    }
  }
}
</style>
