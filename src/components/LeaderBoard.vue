<template>
<div class="wrapper">
  <aside class="leaderboard shadow" id="leaderboard">
    <p class="primary-text text-shadow title" >Leaderboard</p>
      <ul class="scores-list text-shadow" id="scores-list">
        <li class="shadow"><span class="name ">Ofure</span><span class="score">750</span></li>
        <li class="shadow"><span class="name">Olanrewaju</span><span class="score">650</span></li>
        <li class="shadow"><span class="name">New User</span><span class="score">550</span></li>
        <li class="shadow"><span class="name">Guest</span><span class="score">450</span></li>
        <li class="shadow"><span class="name">Guest</span><span class="score">350</span></li>
        <li class="shadow"><span class="name">My Name</span><span class="score">250</span></li>
      </ul>  
  </aside>
</div>
</template>

<script>
export default {

}
</script>

<style>
@import url('./../assets/leaderboard.css');
.title{
  font-size: 1.5rem;
  margin-top: 0.5em;
}
</style>
