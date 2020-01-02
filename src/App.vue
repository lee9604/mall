<template>
  <div id="app">
<!--    <router-view/>-->
    <buttton @click="getBrand">test</buttton>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    async getBrand () {
      let ret = await this.$http.get('/pmsProductBrand/list')
      console.log(ret)
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
