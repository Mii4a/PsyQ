<template lang="pug">
  div.signin
    div.signin--container
      session-form-title(session-title="Signin")
      b-form(@submit.prevent="signin")
        b-form-group(label="Eメール" label-for="email")
          b-form-input#email(v-model="email" type="text")
        b-form-group(label="パスワード" label-for="password")
          b-form-input#password(v-model="password" type="text")
        base-submit-button(button-message="ログイン")
        div.to-signup.text-right
          router-link(to="/signup")
            | 登録が済んでいない方はこちら
</template>

<script>
import axios from 'axios'
import SessionFormTitle from '@/components/SessionFormTitle'
import BaseSubmitButton from '@/components/BaseSubmitButton'

export default {
  name: 'Signin',
  components: {
    SessionFormTitle,
    BaseSubmitButton
  },
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + process.env.VUE_APP_API_TOKEN
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
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/workbooks')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
  &--container {
    padding: 10px;
  }
}

</style>
