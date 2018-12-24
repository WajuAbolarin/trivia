<template>
    <header>
        <h1 class="left black text-shadow"><span class="alt-text">J</span>W</h1>
        <div class="right details black text-shadow">
            <div class="top">
            <span class="score alt-text">{{score}}</span>
              &nbsp;
            <span class="difficulty">{{set}}/5</span>
            </div>
            <div class="progress-border">
                <div class="progress" :style="`width: ${percentage}%;`"></div>
            </div>
            <div class="bottom">
            <span class="name">{{player}}</span></div>
        </div>
    </header>
</template>

<script>
export default {
  props:['score', 'percentage', 'player', 'set'],


}
</script>

<style>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: no-wrap;
    padding: 20px 5px;
    width: 100%;
  }
  .left{
      font-size: 70px;
      font-weight: bold;
      z-index: 10;
  }
  .left span{
    font-size: 90px;
    font-style: italic;
    display:inline-block;
    z-index: -1;
    transform: translateX(15px) translateY(5px);
  }
  .right{
    display: flex column;
    justify-content: space-between;
  }
  .details{
    font-size: 25px;  
  }
  
  .score{
    display: inline-block;
    margin-right: auto;
     font-size: 65px;
    font-weight:bold;
    font-style: italic;
  }
  .difficulty, 
  .name{
      text-transform:uppercase;
      font-style: italic;
  }
  .progress-border{
    width: 100%;
    min-height: 30px;
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 15px;
    position:relative;
  }
  .progress{
    position:absolute;
    left:1px;
    top:0;
    /* display:block; */
    min-height: 25px;
    background:rgba(250, 210, 98,0.9);
    border-radius: 15px;
  }
  
</style>
