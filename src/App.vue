<template>
  <vHeader></vHeader>
  <div class="py-3">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import vHeader from '@/components/Header.vue'
export default {
  components: {
    vHeader
  }
}
</script>

<style lang="scss"></style>
