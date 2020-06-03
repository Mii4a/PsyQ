<template lang="pug">
  div.sidebar-link
    router-link(
      :to="{path: `${linkTo}`, query: { category: `${query}` }}")
      div.sidebar-link--container.d-flex
        div.sidebar-link--container__left
          div.sidebar-icon
            font-awesome-icon(
              :icon="[`fas`,fontAwesomeIcon]"
              )
        div.sidebar-link--container__right
          div.sidebar-category
            span
              | {{ linkName }}
</template>

<script>

export default {
  name: "TheSidebarLink",
  props: {
    query: {
      type: String,
      default: ''
    },
    count: {
      type: String,
      default: '1'
    },
    linkName: {
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
.sidebar-category {
  color: #777;
  font-size: 1.2rem;
  padding-top: 7px;
}
.sidebar-icon {
  background-color: #22bbaa;
  border-radius: 50%;
  color: #fff;
  font-size: 1.2rem;
  height: 40px;
  padding-top: 7px;
  text-align: center;
  width: 40px;
}
.sidebar-link {
  height: 60px;
  margin-bottom: 15px;
  width: 100%;
  &--container {
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 10px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .3);
    padding: 10px 15px;
    &__left {
      width: 30%;
    }
    &__right {
      width: 70%;
    }
  }
}
</style>
