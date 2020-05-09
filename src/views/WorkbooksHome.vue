<template lang="pug">
  div
    | WorkbooksHome
    div(@click='signOut')
      | logout
    b-container
      b-row
        div.workbooks(v-for="workbook in workbooks" cols="6")
          p {{workbook.subject_name}}

</template>

<script>
import axios from 'axios'

export default{
  name: 'WorkbooksHome',
  data() {
    return {
      workbooks: [],
      loading: true
    }
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signOut() {
      this.$http.secured.delete(process.env.VUE_APP_API + `logout`, {
         headers: {'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN}
         }).then(response => {
           delete localStorage.csrf
           delete localStorage.signedIn
           this.$router.replace('/')
         }).catch(error => {
           this.setError(error, 'Cannot sign out')
         })
    },
    getWorkbooks() {
      axios.get(process.env.VUE_APP_API + 'workbooks', {
      headers: { 'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN }
      }).then(response => {
        this.workbooks = response.data
      })
    }
  },
  mounted() {
    this.getWorkbooks()
  }
}
</script>
<style lang="scss" scoped>
.workbooks{
  border: 1px solid #000;
  height: 50px;
}
</style>
