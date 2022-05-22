<template>
  <!--<img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <Auth/>
  <Calculator/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Calculator from './components/Calculator.vue'
import Auth from './components/Auth.vue'
import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/calc', component: Calculator }, { path: '/', component: Auth }],
})

export default {
  name: 'App',
  components: {
    //HelloWorld,
    Calculator,
    Auth
}, router: router
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
