<template>
  <div id="app" class="wrapper app-wrapper">
    <router-view />
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
   flex-direction: column;
 }
 .view{
   flex: 0 0 1;
 }
</style>
