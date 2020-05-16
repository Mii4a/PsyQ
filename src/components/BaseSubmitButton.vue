<template lang="pug">
  div.button
    b-button.button--submit(type="submit" variant="primary")
      | {{ buttonMessage }}
</template>

<script>
export default {
  name: "BaseSubmitButton",
  props: {
    buttonMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  margin-bottom: 20px;
  padding-top: 20px;
  &--submit {
    margin-left: auto;
    width: 100%;
  }
}
</style>
