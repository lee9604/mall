<template>
  <div class="main">
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
.main {
  height: 100%;
  background-color: #1b1a3b;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(-400px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>
