<template lang="pug">
  div.signin
    app-section-title(section-title="Signin")
    div.signin--container
      b-alert(
        :show="expired"
        variant="warning"
      )
        | ログインして下さい
      b-alert(
        :show="errorObj"
        variant="danger"
      )
        | Eメール・パスワードに間違いがあります
      b-form(@submit.prevent="signin")
        b-form-group(label="Eメール" label-for="email")
          b-form-input#email(v-model="email" type="text")
        b-form-group(label="パスワード" label-for="password")
          b-form-input#password(v-model="password" type="text")
        app-submit-button(button-message="ログイン")
        div.to-signup.text-right
          router-link(to="/signup")
            | 登録が済んでいない方はこちら
</template>

<script>
import axios from 'axios'
import AppSectionTitle from '@/components/AppSectionTitle'
import AppSubmitButton from '@/components/AppSubmitButton'

export default {
  name: 'Signin',
  components: {
    AppSectionTitle,
    AppSubmitButton
  },
  data () {
    return {
      email: '',
      password: '',
      errorObj: null,
      error: '',
      expired: null
    }
  },
  mounted () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Token ' + process.env.VUE_APP_API_TOKEN
      }
      this.$http.plain.post(process.env.VUE_APP_API + 'login', {
        email: this.email,
        password: this.password,
        headers: headers
      }).then(response => this.signInSuccessful(response))
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
      this.errorObj = true
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      const signedIn = localStorage.signedIn
      const expired = this.$route.query.expired
      if (signedIn) {
        this.$router.replace('/home')
      }
      if (expired) {
        this.expired = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
  &--container {
    padding: 10px 10% 60px;
  }
}

</style>
