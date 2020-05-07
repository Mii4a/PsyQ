<template lang="pug">
  div.home
    div.home-container
      div.title
        img.title-logo(src="@/assets/psycholo_logo.png")
        h1.title-name
          | PSYCHOLO
        p.title-explanation
          | Webで学べる心理学クイズアプリ
      div.sessions
        router-link(to="/signin").sessions-link
          div.sessions-link_button
            b-icon-person-check-fill
            | ログイン
        router-link(to="/signup").sessions-link
          div.sessions-link_button
            b-icon-person-plus-fill
            | 登録
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">

.home{
  background-image: url('../assets/home_image.jpg');
  background-position: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  &-container {
    background-color: rgba(255, 255, 255, .6);
    height: 100vh;
  }
}

.title{
  padding-top: 20px;
  margin-bottom: 30px;
  &-logo{
    margin-bottom: 10px;
  }
  &-name{
    font-family: 'mandali', sans-serif;
  }
}

.sessions{
  padding: 0 6% 0 6%;
  display: inline-block;
  &-link{
    text-decoration: none;
    &_button {
      border: 3px solid #fffafa;
      border-radius: 15px;
      height: 40px;
      padding: 5px 0;
      margin-bottom: 15px;
      width: 200px;
      color: #fff;
    }
  }
  .bi{
    font-size: 20px;
    margin-right: 10px;
  }
}


</style>
