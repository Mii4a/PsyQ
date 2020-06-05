<template lang="pug">
div.question-start-button
  div.question-start-button--container
    router-link(
      :to="{path: `/question`, query: { basicCategory: `${basicCategory}`, category: `${category}`, workbook: `${workbookId}`}}"
      )
      p.question-start-button--container__message
        |  スタート
</template>

<script>
export default {
  name: "WorkbookQuestionStartButton",
  props: {
    basicCategory: {
      type: String,
      required: true,
      default: 'basic'
    },
    category: {
      type: String,
      required: true,
      default: 'learning'
    },
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
    border-radius: 20px;
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
