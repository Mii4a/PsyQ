<template lang="pug">
  b-form-group(
    :label="パスワード"
    :label-for="password"
    )
    b-form-input(
      :v-model="password"
      :type="text"
      )
</template>

<script>
export default {
  name: 'CreateFormGroup',
  props: {
    model: {
      type
    }
  }
}
</script>
