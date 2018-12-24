<template>
  <div class="footer-menu--wrapper">
    <ul class="footer-menu">
      <li class="footer-menu__item">
        <router-link to="/game">Play</router-link>
      </li>
      <li class="footer-menu__item">
        <router-link to="/leaderboard">leaderboard</router-link>
      </li>
      <li class="footer-menu__item">
        <router-link to="/">Profile</router-link>
      </li>
      <li class="footer-menu__item">
        <router-link to="/">Settings</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>
 
 .footer-menu{
   list-style: none;
   display: flex;
   justify-content: space-around;
 }
  .footer-menu__item{
    font-size: 0.7em;
  }
  .footer-menu__item a{
    text-transform: uppercase;
  }

</style>
