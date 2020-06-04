<template lang="pug">
  div.create
    app-section-title(
      section-title="Create"
    )
    div.create--container
      app-auth-form(
        v-if="!adminUser"
        @child-event="fetchAuth"
      )
      router-view(
        v-if="adminUser"
      )


</template>

<script>
import AppAuthForm from '@/components/AppAuthForm'
import AppSectionTitle from '@/components/AppSectionTitle'

export default {
  name: 'Create',
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
        this.$router.replace('/create/psychology')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  &--container {
    padding: 15px 8%;
  }
}
</style>
