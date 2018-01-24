<template>
  <div id="app">

    <app-nav></app-nav>
    <router-view class="tampil-router"></router-view>

  </div>
</template>

<script>
import AppNav from './components/AppNav';
import { mapMutations } from 'vuex'

export default {
  data() {
    return{

    }
  },
  components: {
    AppNav
  },
  methods: {
    ...mapMutations([
      'ifLogin',
      'getOneUser'
    ])
  },
  mounted() {
    this.ifLogin()
    this.getOneUser()
  }

}
</script>

<style>
#app {

  font-family: 'Lato','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
a {
  text-decoration: none;
}
.tampil-router {
  margin-top: 20px;
}
</style>
