<template>
  <div id="app" class="app-wrapper">
    <router-view class="view" />
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
 .app-wrapper{
   display: flex;
   flex-direction: column;
   min-height: 100vh;
 }
 .view{
   flex: 1;
 }
</style>
