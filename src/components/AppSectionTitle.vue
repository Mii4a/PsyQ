<template lang="pug">
  div.section-title
    h1.section-title--container.text-center
      div.section-title--container__linear
      span.section-title--container__name
        | {{ sectionTitle }}
      div.section-title--container__linear



</template>

<script>
export default{
  name: "SectionTitle",
  props: {
    sectionTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.section-title {
  &--container {
    display: flex;
    padding-top: 20px;
    &__name {
      background-color: #fff;
      color: #333;
      display: inline-block;
      font-size: 1.6rem;
      font-weight: bold;
      width: 130%;
    }
    &__linear {
      background-color: #22bbaa;
      height: 2px;
      position: relative;
      top: 18px;
      width: 100%;
    }
  }
}
</style>
