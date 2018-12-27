<template>
  <div class="footer-menu--wrapper">
    <ul class="footer-menu">
        <router-link tag="li" active-class="footer-menu__item--active" class="footer-menu__item" to="/game">
          <i class="footer-menu__icon"><img src="./../assets/game.svg"></i>
          <a>play</a>
        </router-link>

        <router-link tag="li" active-class="footer-menu__item--active" class="footer-menu__item" to="/leaderboard" >
          <i class="footer-menu__icon"><img src="./../assets/leaderboard.svg"></i>
          <a>leaderboard</a>
        </router-link>


        <router-link tag="li" active-class="footer-menu__item--active" class="footer-menu__item " to="/sign-in">
          <i class="footer-menu__icon"><img src="./../assets/profile.svg"></i>
          <a>Profile</a>
        </router-link> 

        <!-- <router-link tag="li" active-class="footer-menu__item--active" class="footer-menu__item" to="/" >
          <i class="footer-menu__icon"><img src="./../assets/settings.svg"></i>
          <a>Settings</a>
        </router-link>  -->
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
   background: rgba(255, 255,255, 0.1);
   padding: 0.4em;
   border-top: 1px solid rgba(255, 255,255, 0.3);
   box-shadow: inset 2px -4px 12px 2px rgba(0, 0,0, 0.2);
 }
  .footer-menu__item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.6em;
  }
  .footer-menu__item:hover a,
  .footer-menu__item--active a{
    color: rgba(250, 210, 98,0.9);
    font-weight: 400;

  }
  .footer-menu__icon img{
    width: 20px;
    height: 20px;
  }
  .footer-menu__item a{
    text-transform: uppercase;
    font-weight: 400;
  }
</style>
