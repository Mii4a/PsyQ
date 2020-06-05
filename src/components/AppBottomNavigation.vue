<template lang="pug">
  div.bottom-nav.d-flex
    div.bottom-nav--button
      router-link.bottom-nav--button__link(
        :to="{ path: `${path}`, query: { basicCategory: `${basicCategory}`, category: `${category}`} }"
        )
        b-icon-box-arrow-in-left.bottom-nav--button__icon
    div.bottom-nav--button.center-button
      router-link.bottom-nav--button__link(
        to="/home"
        )
        b-icon-house.bottom-nav--button__icon.center-button--icon
    div.bottom-nav--button.toggle-button(
      v-b-toggle.sidebar-right
      )
      b-icon-list-ul.bottom-nav--button__icon
</template>

<script>
export default {
  name: "AppBottomNavigation",
  props: {
    basicCategory: {
      type: String,
      required: false,
      default: 'basic'
    },
    category: {
      type: String,
      required: false,
      default: 'none'
    },
    path: {
      type: String,
      required: false,
      default: '/home'
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, .1);
  bottom: 0;
  box-shadow: 0 -12px 10px -3px rgba(0, 0, 0, .1);
  height: 65px;
  position: fixed;
  width: 100%;
  &--button {
    border-radius: none;
    padding-top: 17px;
    text-align: center;
    width: 33%;
    &__icon {
      color: #22bbaa;
      font-size: 2rem;
      font-weight: bold;
    }
  }
}

</style>
