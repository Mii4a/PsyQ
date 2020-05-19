<template lang="pug">
  div.signup
    app-section-title(section-title="Signup")
    div.signup--container
      b-form(@submit.prevent="postUser")
        b-form-group(label="ユーザー名:" label-for="name")
          b-form-input#name(v-model="user.name" type="text" required)
        b-form-group(label="Eメール:" label-for="email")
          b-form-input#email(v-model="user.email" type="email" required)
        b-form-group(label="パスワード:" label-for="password")
          b-form-input#password(v-model="user.password" type="text" required)
        b-form-group(label="パスワード(確認):" label-for="password_confirmation")
          b-form-input#password_confirmation(v-model="user.passwordConfirmation"
          type="text" required)
        app-submit-button(button-message="登録する")


</template>
<script>
import AppSectionTitle from '@/components/AppSectionTitle'
import AppSubmitButton from '@/components/AppSubmitButton'

export default {
  name: 'Signup',
  components: {
    AppSectionTitle,
    AppSubmitButton
  },
  data() {
    return {
      show: true,
      user: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    async postUser() {
      const postingUrl = process.env.VUE_APP_API + 'users'
      const token = {
        'Authorization': 'Token ' + process.env.VUE_APP_API_TOKEN
        }
      const postingParams = {
        user: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.passwordConfirmation
        },
        headers: token
      }
      await this.$http.secured.post(postingUrl, postingParams)
        .then(response => this.signInSuccessful(response))
        .catch(error => this.signInFailed(error))
    },
    signInSuccessful (response) {
      if (!response.data.csrf) {
        this.signInFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.$store.dispatch('doFetchSignedIn')
      this.$store.dispatch('doFetchUser', response.data.name)
      this.error = ''
      this.$router.replace('/home')
    },
    signInFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
  }
}
</script>

<style lang="scss" scoped>
.signup {
  &--container {
    padding: 10px 10% 60px;
  }
}

.button {
  display: flex;
  padding-top: 10px;
  &--submit {
    margin-left: auto;
    width: 120px;
  }
}
</style>
