<template>
  <div id="app" class="app-wrapper">
    <keep-alive>
      <router-view> </router-view>
    </keep-alive>
    <footer-menu></footer-menu>
  </div>
</template>

<script>
import FooterMenu from '@/components/FooterMenu.vue'

export default {
  components: {
    FooterMenu
  },
}
</script>
<style>
 @import url('./assets/framework.css');

</style>
