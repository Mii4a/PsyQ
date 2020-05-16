<template lang="pug">
  div
    div
      b-form
        b-form-group
          b-form-input(type="text" v-model="subjectName")
        b-form-group
          b-form-input(type="text" v-model="subjectExplanation")
        b-button(type="submit" @click="postWorkbooks")
</template>
