<template lang="pug">
  div.auth-form
    b-form(
      @submit.prevent=""
      )
      b-form-group(
        label="パスワード"
        label-for="password"
        )
        b-form-input(
          v-model="password"
          type="text"
          )
      b-form-group(
        label="pet"
        label-for="pet"
        )
        b-form-input(
          v-model="pet"
          type="text"
          )
      app-submit-button(
        button-message="確認"
        )
</template>

<script>
import AppSubmitButton from '@/components/AppSubmitButton'

export default {
  name: 'AuthForm',
  components: {
    AppSubmitButton
  },
  data () {
    return {
      admin: false,
      password: '',
      pet: ''
    }
  },
  methods: {
    auth () {
      const password = this.password
      const password_confirmaiton = process.env.VUE_APP_PASSWORD
      const pet = this.pet
      const pet_confirmation = process.env.VUE_APP_PET
      if (password === password_confirmaiton && pet === pet_confirmation) {
        this.admin = true
        this.$emit('child-event', this.admin)
      }
    }
  }
}
</script>
