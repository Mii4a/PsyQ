<template lang="pug">
  h1.page-title.text-center
    span.page-title--name
      | {{ sessionTitle }}
</template>

<script>
export default{
  name: "SessionFormTitle",
  props: {
    sessionTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  &--name {
    font-size: 1.6rem;
    font-weight: bold;
  }
}
</style>
