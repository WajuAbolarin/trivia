<template>
    <div v-cloak class="view">
        <app-header 
            :score="score"
            :percentage="questionPercentage"
            :player="player"
            :set="currentSet"
            >
        </app-header>
        <div class="wrap mt-2" v-show="!fetchingQuestions"> 
            <app-question 
            :key="currentQuestion.question"
            v-if="currentQuestion"
            :question="currentQuestion"
            ></app-question>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppLeaderboard from '@/components/AppLeaderboard'
import AppQuestion from '@/components/AppQuestion'
import {ACTIONS } from './../store/modules/questions/types'

export default {
    components:{
        AppHeader,
        AppLeaderboard,
        AppQuestion
    },
    data(){
        return {
            fetchingQuestions: true
        } 
    },
    computed: {
        currentQuestion () {
            return this.$store.getters.currentQuestion
        },
        score () {
            return this.$store.getters.score
        },
        questionPercentage(){
            return this.$store.getters.questionPercentage
        },
        player(){
            return this.$store.state.player.player.profile.username
        },
        currentSet(){
            return this.$store.getters.currentSet
        }

    },
   async created(){
    await this.$store.dispatch(ACTIONS.FETCH_QUESTIONS)
    this.fetchingQuestions = false 
  }
  
}
</script>

<style>
[v-cloak]{
display: none;
}
.wrap {
display: flex;
justify-content: space-between;
width: 100vw;
}

</style>
