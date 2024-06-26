<template>
  <HelloWorld></HelloWorld>
  <!-- <vHeader v-if="isLogin"></vHeader>
  <div class="py-3">
    <router-view :key="$route.fullPath"></router-view>
  </div> -->
</template>

<script>
import { mapState } from 'pinia'
import AuthStore from '@/store/AuthStore.js'
// import vHeader from '@/components/Header.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    // vHeader,
    HelloWorld
  },
  computed: {
    ...mapState(AuthStore, ['isLogin'])
  }
}
</script>

<style lang="scss"></style>
