<template>
    <header>
        <div class="left">
          <img src="./../assets/logo.png" class="logo" alt="logo">
          </div>
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
            <span class="name">{{player}}</span>
          </div>
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
  padding: 0.1em 1em;
  width: 100%;
}
.left{
  font-weight: bold;
  z-index: 10;
}
.logo{
  margin-top: 0.5em;
  width: 50px;
  height: 50px;
}
.left span{
font-size: 2rem;
font-style: italic;
display:inline-block;
z-index: -1;
transform: translateX(1rem) translateY(0.5rem);
}
.right{
display: flex column;
justify-content: space-between;
}
.details{
font-size: 0.7rem;  
}

.score{
display: inline-block;
margin-right: auto;
font-size: 2rem;
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
min-height: 1em;
border: 2px solid rgba(255,255,255,0.5);
border-radius: 15px;
position:relative;
}
.progress{
position:absolute;
left:-2px;
top:-2px;
height: 1em;
background:rgba(250, 210, 98,0.9);
border-radius: 15px;
}

</style>
