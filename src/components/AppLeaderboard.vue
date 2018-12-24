<template>
<div class="wrapper" v-if="scores.length">
  <aside class="leaderboard shadow" id="leaderboard">
    <p class="primary-text text-shadow title" >Leaderboard</p>
      <ul class="scores-list text-shadow" id="scores-list">
        <li class="shadow" v-for="score in scores" :key="score.username" ><span class="name ">{{score.username}}</span><span class="score">{{score.score}}</span></li>
      </ul>  
  </aside>
</div>
</template>

<script>
export default {
  props : ['scores'],
}
</script>

<style>
@import url('./../assets/leaderboard.css');
.title{
  font-size: 1.5rem;
  margin-top: 0.5em;
}
</style>
