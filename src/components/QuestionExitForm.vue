<template lang="pug">
  div.question-exit-form
    p.question-exit-form--message
      | {{ 'クイズを終了しますか？' }}
    div.question-exit-form--buttons.d-flex
      div.question-exit-form--buttons__button.exit
        router-link.link(
          :to="{ path: `${path}`, query: { basicCategory: `${basicCategory}`, category: `${category}`} }"
          )
          font-awesome-icon.exit--icon.button-icon(
            :icon="[`fas`, 'door-open']"
          )
          p.exit--message.button-message
            | 終了する
      div.question-exit-form--buttons__button.not-exit(
        @click="notExit"
      )
        font-awesome-icon.not-exit--icon.button-icon(
          :icon="[`fas`, 'running']"
        )
        p.not-exit--message.button-message
          | 続ける

</template>

<script>
export default {
  name: 'QuestionExitForm',
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
    path: {
      type: String,
      required: true,
      default: '/home'
    },
  },
  methods: {
    notExit () {
      this.$emit('not-exit')
    }
  }
}
</script>

<style lang="scss" scoped>
.question-exit-form {
  background-color: rgba(34, 187, 176, .2);
  padding: 25% 10% 46%;
  text-align: center;
  &--buttons {
    padding-top: 10px;
    &__button {
      background-color: #eeffff;
      border-radius: 20px;
      font-weight: bold;
      height: 100px;
      padding-top: 25px;
      width: 50%;
    }
    .button-icon {
      font-size: 1.6rem;
    }
    .button-message {
      padding-top: 2px;
    }
  }
  &--message {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .exit {
    border: 3px solid #d44311;
    margin-right: 20px;
    &--icon {
      color: #d44311;
    }
    &--message {
      color: #d44311;
    }
  }
  .not-exit {
    border: 3px solid #22aabb;
    &--icon {
      color: #22aabb;
    }
    &--message {
      color: #22aabb;
    }
  }
}
</style>
