<template lang="pug">
  div
    | WorkbooksHome
    div(@click='signOut')
      | logout
    b-form
      b-form-input(v-model="subjectName" type="text")
      b-form-input(v-model="subjectExplanation" type="text")
      b-form-file(type="file" accept="image/jpeg, image/png" @change="onImageChange")
      p.mt-3 Selected file: {{ subjectImage ? subjectImage.name : 'Not selected'}}
      b-button(type="submit" @click="upload")
    b-container
      p {{ workbooks }}
      b-row
        div.workbooks(v-for="workbook in workbooks" cols="6")
          b-link(:to="'workbook/' + Number(workbook.id)")
            p {{ workbook.subject_name }}
            img


</template>

<script>
import axios from 'axios'

export default{
  name: 'WorkbookIndex',
  data() {
    return {
      workbooks: [],
      workbookId: '',
      subjectName: '',
      subjectExplanation: '',
      subjectImage: [],
      preSignedPost: '',
    }
  },
  props: {
    value: {
      type: String
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
    },
    async uploadFile(file) {
      const apiUrl = process.env.VUE_APP_API + 'api/v1/workbooks/' + this.id + '/upload'
      const apiToken = 'Token ' + process.env.VUE_APP_API_TOKEN
      await axios.get(apiUrl, {headers: {
        Authorization: apiToken
      }}).then(res => {
        this.preSignedPost = res.data
      })
      await axios.post(preSignedPost.url, Object.assign(preSignedPost.data, {file: file.raw}))
    },
    onImageChange(event) {
      const files = event.target.files || event.dataTransfer.files
      const file = files[0]
      if (this.checkFile(file)) {
        this.getBase64(file).then(image => this.subjectImage = image)
        .catch(error => this.setError(error))
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    checkFile(file) {
      let result = true
      const SIZE_LIMIT = 5000000

      if (!file) {
        result = false
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
        result = false
      }

      if (file.size > SIZE_LIMIT) {
        result = false
      }
      return result
    },
    upload() {
      axios.post(process.env.VUE_APP_API + 'workbooks', {
        workbook: {
          subject_name: this.subjectName,
          subject_explanation: this.subjectExplanation,
          subject_image: this.subjectImage
        }
      })
    }
  },
  created() {
    this.getWorkbooks()
  },
  uploaded() {
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
