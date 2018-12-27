<template>
<div class="wrapper" v-if="scores.length">
  <aside class="leaderboard" id="leaderboard">
    <p class="primary-text text-shadow title">Leaderboard</p>
      <ul class="scores-list mt-2" id="scores-list">
        <li class="shadow user-score" v-for="score in scores" :key="score.username" ><span class="name black">{{score.username}}</span><span class="score">{{score.score}}</span></li>
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
.title{
  font-size: 1rem;
  margin-top: 0.5em;
}
.user-score{
  margin: 0.2em 0;
}
aside.leaderboard{
    display: flex;
    flex-direction: column;
    background: transparent;
    width: 90%;
    max-width: 320px;
    margin: auto;
    padding: 0.2em;    
    font-weight: bold;
    cursor: pointer;
    max-height: 80vh;
    overflow: scroll;
  }
  .leaderboard p {
    margin-bottom: 1px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.15em;
  }
  .leaderboard ul{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;  
  }
  .leaderboard ul li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    padding: 5%;
    border-radius: 5px;    
  }
  .scores-list span.name {
    margin-right: auto;
    font-weight: bolder;
    font-size: 0.6rem;
  }
  .scores-list span.score {
    color:#FFE16B;
    font-weight: bold;
    font-size: 0.7rem;
  }
  span.score{
    margin-right: 0;
  }
</style>
