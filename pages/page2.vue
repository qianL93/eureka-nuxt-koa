<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        nuxt
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
      <ul>
        <li v-for="item in list">{{item}}</li>
      </ul>
      <button @click="add">+</button>
      <button @click="sub">-</button>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  name: 'app',
  data() {
    return {
      msg: 'hello',
      list:[2,34,4,5,6,6]
    }
  },
  methods:{
    add(){
      this.list.push(1);
    },
    sub(){
      this.list.shift();
    }
  },
  components: {
    Logo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
