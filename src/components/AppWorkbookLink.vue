<template lang="pug">
  div.workbook-link
    router-link.link(
      :to="{path: '/workbooks/' + `${id}`, query: { basicCategory: `${basicCategory}`, category: `${category}`, psychologyId: `${psychologyId}` }}"
      )
      div.workbook-link--container
        div.workbook-name
          span
            | {{ subjectName }}
          span.next
            font-awesome-icon(
              icon="arrow-right"
              )
        div.workbook-information
          span.workbook-information--questions-count
            | {{ "問題数 " + questionsCount }}
</template>

<script>

export default {
  name: "AppWorkbookLink",
  props: {
    basicCategory: {
      type: String,
      required: true,
      default: 'basic'
    },
    category: {
      type: String,
      required: true,
      default: 'learning'
    },
    id: {
      type: Number,
      required: true
    },
    psychologyId: {
      type: Number,
      required: true,
      default: 1
    },
    questionsCount: {
      type: Number,
      required: true
    },
    subjectName: {
      type: String,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.next {
  float: right;
  font-size: .8rem;
  padding-top: 3px;
}
.workbook-link {
  height: 60px;
  margin-bottom: 15px;
  transition: ease .1s;
  width: 100%;
  &:hover {
    border-bottom: 0;
  }
  &--container {
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
  }
  .workbook-name {
    color: #777;
    font-size: 1.2rem;
    padding: 8px 10px 2px;
    text-decoration: none;
  }
  .workbook-information {
    background-color: #11aa99;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    color: #fff;
    font-size: .9rem;
    padding: 1px 10px;
    text-decoration: none;
  }
}
</style>
