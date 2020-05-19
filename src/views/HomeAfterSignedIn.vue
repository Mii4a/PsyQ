<template lang="pug">
  div.signed-home
    app-section-title(section-title="Home")
    div.signed-home--container
      app-psychology-link(
        v-for="psychology in psychologies"
        :key="psychology.category"
        :category="psychology.category"
        :font-awesome-icon="psychology.fontAwesomeIcon"
        :link-to="psychology.linkTo"
      )
    app-bottom-navigation
</template>

<script>
import axios from 'axios'
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppPsychologyLink from '@/components/AppPsychologyLink'
import AppSectionTitle from '@/components/AppSectionTitle'

export default{
  name: 'HomeAfterSignedIn',
  components: {
    AppBottomNavigation,
    AppPsychologyLink,
    AppSectionTitle
  },
  data() {
    return {
      error: '',
      psychologies: [
        {
          category: '基礎',
          fontAwesomeIcon: 'graduation-cap',
          linkTo: '/basic-psychology'
        },
        {
          category: '応用',
          fontAwesomeIcon: 'hand-holding-heart',
          linkTo: '/aplied-psychology'
        }
      ]
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
.signed-home {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
