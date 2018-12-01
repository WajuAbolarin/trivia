<template>
    <span class="primary-text text-shadow">{{timeLeft}}s</span>    
</template>

<script>
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
                this.$store.dispatch('toNextQuestion')
            }
        }
    }

}
</script>

<style>

</style>
