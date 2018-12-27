<template>
    <span class="alt-text text-bold mt-1 countdown">{{timeLeft}}</span>    
</template>

<script>
import {ACTIONS } from './../store/modules/questions/types'


export default {
    props:['initialTime'],
    data(){
        return {
            currentTime: this.initialTime,
            timer: null 
        }
    },
    computed:{
        timeLeft(){
            return this.currentTime > 0 ?  this.currentTime : 0
        }
    },
    mounted(){
        this.timer = setInterval( ()=> {
            this.currentTime--
        }, 1000)
        
    },
    watch:{
        currentTime(val){
            if(val <= 0){
                clearInterval(this.timer)
                this.$store.dispatch(ACTIONS.TO_NEXT_QUESTION)
            }
        }
    }

}
</script>

<style>
.countdown {
margin-left: auto;
background: rgba(0, 0, 0, 0.5);
height: 45px;
width: 45px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 50%;
font-size: 1.2rem;
font-style: italic;

}
</style>
