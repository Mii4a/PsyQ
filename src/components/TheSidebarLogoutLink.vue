<template lang="pug">
  div.logout-link
    div.logout-link--container.d-flex
      div.logout-link--container__left
        div.logout-icon
          font-awesome-icon(
            :icon="[`fas`,fontAwesomeIcon]"
            )
      div.logout-link--container__right
        div.logout-category
          span
            | {{ linkName }}
</template>

<script>

export default {
  name: "TheSidebarLogoutLink",
  props: {
    query: {
      type: String,
    },
    linkName: {
      type: String,
      default: 'ログアウト'
    },
    fontAwesomeIcon: {
      type: String,
      default: 'sign-out-alt'
    },
  }
}
</script>

<style lang="scss" scoped>
.logout-category {
  color: #777;
  font-size: 1.2rem;
  padding-top: 7px;
}
.logout-icon {
  background-color: #d44311;
  border-radius: 50%;
  color: #fff;
  font-size: 1.2rem;
  height: 40px;
  padding-top: 7px;
  text-align: center;
  width: 40px;
}
.logout-link {
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
