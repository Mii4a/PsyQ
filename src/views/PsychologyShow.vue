<template lang="pug">
  div.psychology-show
    app-section-title(
      section-title="Selects"
      )
    app-loading(
      v-if="loading"
    )
    div.psychology-show--container(
      v-if="!loading"
    )
      b-alert(
        :show="checkWorkbook"
      )
        | まだ問題が作られていないようです。別の分野の問題を探してみましょう！
      app-workbook-link(
        v-for="workbook in workbooks" :key="workbook.id"
        :basicCategory="basicCategory"
        :category="category"
        :id="workbook.id"
        :questions-count="workbook.questions_count"
        :psychology-id="psychology.id"
        :subject-name="workbook.subject_name"
      )
    app-bottom-navigation(
      :basicCategory="basicCategory"
      :path="wayBack",
    )
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation'
import AppLoading from '@/components/AppLoading'
import AppSectionTitle from '@/components/AppSectionTitle'
import AppWorkbookLink from '@/components/AppWorkbookLink'

export default {
  name: "PsychologyShow",
  components: {
    AppBottomNavigation,
    AppLoading,
    AppSectionTitle,
    AppWorkbookLink
  },
  data () {
    return {
      basicCategory: this.$route.query.basicCategory,
      category: this.$route.query.category,
      loading: true,
      psychology: [],
      wayBack: '/psychologies/',
      workbooks: [],
    }
  },
  computed: {
    checkWorkbook () {
      const workbooks = this.workbooks
      if (workbooks.length === 0) {
        return true
      } else {
        return false
      }
    },
  },
  updated() {
    this.checkSignedIn()
  },
  created () {
    this.checkSignedIn()
    this.getPsychologyAndWorkbooks()
  },
  methods: {
    checkSignedIn() {
      if (!localStorage.signedIn) {
        this.$router.replace({
          path: '/signin',
          query: {
            expired: true
          }
        })
      }
    },
    async getPsychologyAndWorkbooks () {
      const psychologyId = this.$route.params['id']
      const gettingUrl = process.env.VUE_APP_API + '/psychologies/' + psychologyId
      await this.$http.secured.get(
        gettingUrl
        ).then(
          response => {
            this.psychology = response.data.psychology
            this.workbooks = response.data.workbooks
            this.loading = false
          }
        ).catch(
          error => setError(error)
        )
    },
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
  }
}
</script>

<style lang="scss" scoped>
.psychology-show {
  &--container {
    padding: 10px 8% 60px;
  }
}
</style>
