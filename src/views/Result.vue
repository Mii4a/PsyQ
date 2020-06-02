<template lang="pug">
  div.result
    app-section-title(
      section-title="Result"
    )
    div.result--container
      result-count(
        :correct-answer-count="correctAnswerCount"
        :total-question-number="totalQuestionNumber"
      )
      result-redirect-to-psychology(
        :psychology-id="psychologyId"
      )
    app-bottom-navigation
</template>

<script>
import AppBottomNavigation from '@/components/AppBottomNavigation.vue'
import AppSectionTitle from '@/components/AppSectionTitle.vue'
import ResultCount from '@/components/ResultCount.vue'
import ResultRedirectToPsychology from '@/components/ResultRedirectToPsychology'

export default {
  name: "Result",
  components: {
    AppBottomNavigation,
    AppSectionTitle,
    ResultCount,
    ResultRedirectToPsychology
  },
  data () {
    return {
      correctAnswerCount: "",
      totalQuestionNumber: "",
      psychologyId: ""
    }
  },
  mounted () {
    this.getParams()
  },
  methods: {
    getParams () {
      this.correctAnswerCount = this.$route.query.totalQuestionNumber
      this.psychologyId = this.$route.query.psychologyId
      this.totalQuestionNumber = this.$route.query.correctAnswerCount
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
