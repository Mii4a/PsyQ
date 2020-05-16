<template lang="pug">
  div.psychology-link
    router-link.psychology-link--container(:to="linkTo")
      div.d-flex
        div.psychology-link--container__left
          div.psychology-icon(:class="`background-color--${color}`")
            font-awesome-icon(:icon="[`fas`,fontAwesomeIcon]")
        div.psychology-link--container__right
          div.psychology-category
            span
              | {{ category + '心理学' }}
</template>

<script>

export default {
  name: "PsychologyLink",
  props: {
    category: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    fontAwesomeIcon: {
      type: String,
      required: true
    },
    linkTo: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.psychology-link {
  height: 70px;
  width: 100%;
  &--container {
    padding: 10px 10px;
    &__left {
      width: 30%;
    }
    &__right {
      width: 70%;
    }
  }
}
</style>
