<template lang="pug">
  div.signed-home
    div.signed-home--container
      b-row.psychologies
        psychology-link(
          category='基礎'
          color='red'
          font-awesome-icon='brain'
          link-to='/basic-psychology'
        )
        div.psychologies--category.applied-psychology
          router-link(to="applied-psycholody")
            |
    bottom-navigation
</template>

<script>
import axios from 'axios'
import BottomNavigation from '@/components/BottomNavigation'
import PsychologyLink from '@/components/PsychologyLink'

export default{
  name: 'HomeAfterSignedIn',
  components: {
    BottomNavigation,
    PsychologyLink
  },
  data() {
    return {
      workbookId: '',
      subjectName: '',
      subjectExplanation: '',
      subjectImage: [],
      preSignedPost: '',
      error: '',
      info: ''
    }
  },
  computed: {
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getWorkbooks() {
      axios.get(process.env.VUE_APP_API + 'workbooks', {
      headers: { 'Authorization': 'Bearer ' + process.env.VUE_APP_API_TOKEN }
      }).then(response => {
        const workbooks = response.data
        this.workbooks = workbooks
        this.$store.dispatch('doFetchWorkbooks', workbooks)
      })
    },
    async uploadFile(file) {
      const apiUrl = process.env.VUE_APP_API + 'api/v1/workbooks/' + this.id + '/upload'
      const apiToken = 'Token ' + process.env.VUE_APP_API_TOKEN
      await this.$http.secured.get(apiUrl, {headers: {
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
    async upload() {
      axios.post(process.env.VUE_APP_API + 'workbooks', {
        workbook: {
          subject_name: this.subjectName,
          subject_explanation: this.subjectExplanation,
          subject_image: this.subjectImage
        }
      }).then(response => {
        this.info = response
        this.$router.replace('/workbooks')
      }).catch(error => setError(error))
    },
    checkSignedIn() {
      if (!localStorage.signedIn) {
        this.$router.replace('/signin')
      }
    }
  },
  created() {
    this.getWorkbooks()
    this.checkSignedIn()
  },
  uploaded() {
    this.getWorkbooks()
    this.checkSignedIn()
  }
}
</script>
<style lang="scss" scoped>
.psychologies {
  margin: 0 0;
  &--category {

  }
}
.signed-home {
  &--container {
    padding: 10% 10%
  }
}
</style>
