<template lang="pug">
  div.workbook-link
    router-link(
      :to="{path: '/workbooks/' + `${id}`}"
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
    id: {
      type: Number,
      required: true
    },
    subjectName: {
      type: String,
      required: true
    },
    questionsCount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.next {
  float: right;
  font-size: .8rem;
  padding-top: 3px;
}
.workbook-name {
  color: #777;
  font-size: 1.2rem;
  padding: 5px 10px 0;
  text-decoration: none;
}
.workbook-information {
  background-color: #11aa99;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #fff;
  font-size: .8rem;
  padding: 0 10px;
  text-decoration: none;
}
.workbook-link {
  height: 60px;
  margin-bottom: 10px;
  transition: ease .1s;
  width: 100%;
  &:hover {
    transform: scale(1.1);
  }
  &--container {
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
  }
}
</style>
