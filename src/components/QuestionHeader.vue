<template lang="pug">
div.question-header
  div.question-header--container.exit
    router-link.icon(
        :to="{ path: `${path}`, query: { basicCategory: `${basicCategory}`, category: `${category}`} }"
        )
        b-icon-x-circle.bottom-nav--button__icon
  div.question-header--container.limit-time
    | {{ limitTime }}
  div.question-header--container.question-number
    span.question-number
      | {{ currentQuestionNumber + '/' + totalQuestionNumber}}
</template>

<script>
export default {
  name: "QuestionHeader",
  props: {
    basicCategory: {
      type: String,
      required: true,
      default: 'basic'
    },
    category: {
      type: String,
      required: true,
      default: 'none'
    },
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
    path: {
      type: String,
      required: true,
      default: '/home'
    },
    totalQuestionNumber: {
      type: Number,
      required: true,
      default: 0
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
  }
  .exit {
    font-size: 1.4rem;
    padding-left: 5px;
    .icon {
      color: #555;
    }
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
