<template>
  <div class="container">
    <h1 class="#f3e5f5 purple lighten-5 center">
      Sign In
    </h1>
    <form
      class="col"
      @submit.prevent="signin"
    >
      <div v-if="error" class="text-red">
        {{ error }}
      </div>

      <div class="row">
        <div class="input-field">
          <input
            v-model="email"
            placeholder="Email"
            type="text"
            class="validate"
            required="required"
          >
        </div>
      </div>
      <div class="row">
        <div class="input-field">
          <input
            v-model="password"
            placeholder="Password"
            type="text"
            class="validate"
            required="required"
          >
        </div>
      </div>

      <button
        type="submit"
        class="btn waves-effect waves-light"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Token ' + process.env.VUE_APP_API_TOKEN
export default {
  name: 'Signin',
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
      this.$http.plain.post(process.env.VUE_APP_API + 'login', {
        email: this.email,
        password: this.password,
        headers: {
          'Content-type': 'application/json'
        }
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
      this.error = ''
      this.$router.replace('/workbooks-home')
    },
    signInFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/workbooks-home')
      }
    }
  }
}
</script>
