<template lang="pug">
  div.psychology-link
    router-link.link(
      :to="{path: `${linkTo}`, query: { basicCategory: `${basicCategory}`, category: `${category}` }}")
      div.psychology-link--container.d-flex
        div.psychology-link--container__left
          div.psychology-icon
            font-awesome-icon(
              :icon="[`fas`,fontAwesomeIcon]"
              )
        div.psychology-link--container__right
          div.psychology-category
            span
              | {{ japaneseFieldName + '心理学' }}
</template>

<script>

export default {
  name: "AppPsychologyLink",
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
    count: {
      type: String,
      default: '1'
    },
    japaneseFieldName: {
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
.psychology-category {
  color: #777;
  font-size: 1.2rem;
  padding-top: 7px;
}
.psychology-icon {
  background-color: #22bbaa;
  border-radius: 50%;
  color: #fff;
  font-size: 1.2rem;
  height: 40px;
  padding: 6px 0 0 1px;
  text-align: center;
  width: 40px;
}
.psychology-link {
  margin-bottom: 15px;
  width: 100%;
  &--container {
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 10px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .3);
    padding: 15px 20px;
    &__left {
      width: 30%;
    }
    &__right {
      width: 70%;
    }
  }
}
</style>
