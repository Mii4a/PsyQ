<template lang="pug">
  div.redirect-to-psychology
    div.button
      router-link.link(:to="psychologyRoute")
        div.link-words
          | 戻る
</template>

<script>
export default {
  name: "ResultRedirectToPsychology",
  props: {
    psychologyId: {
      type: String,
      required: true
    }
  },
  computed: {
    psychologyRoute () {
      const psychologyId = this.psychologyId
      const route = '/psychologies/' + psychologyId
      return route
    }
  }
}
</script>

<style lang="scss" scoped>
.redirect-to-psychology {
  padding: 0 20px;
  .button {
    background-color: #22bbaa;
    border-radius: 20px;
    font-size: 1.2rem;
    height: 50px;
    text-align: center;
    width: 100%;
    .link {
      color: #fff;
    }
    .link-words {
      padding-top: 10px;
    }
  }
}
</style>
