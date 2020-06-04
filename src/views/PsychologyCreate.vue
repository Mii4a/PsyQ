<template lang="pug">
  div.psychology-create
    app-section-title(
      section-title="PsychoForm"
    )
    div.psychology-create--container
      app-auth-form(
        v-if="!adminUser"
        @child-event="fetchAuth"
      )
      

</template>

<script>
import AppAuthForm from '@/components/AppAuthForm'
import AppSectionTitle from '@/components/AppSectionTitle'

export default {
  name: 'PsychologyCreate',
  components: {
    AppAuthForm,
    AppSectionTitle
  },
  data () {
    return {
      adminUser: false,
    }
  },
  computed: {
    admin () {
      if (this.adminUser) {
        return 'ok'
      } else {
        return 'not'
      }
    }
  },
  methods: {
    fetchAuth (payload) {
      if (payload) {
        this.adminUser = payload
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.psychology-create {
  &--container {
    padding: 15px 8%;
  }
}
</style>
