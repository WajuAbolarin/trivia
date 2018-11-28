<template>
    <div v-cloak>
        <app-header 
            :score="score"
            :percentage="questionPercentage"
            :user="user"
            >
        </app-header>
        <div class="wrap">
            <app-question :question="currentQuestion"></app-question>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppLeaderboard from '@/components/AppLeaderboard'
import AppQuestion from '@/components/AppQuestion'


export default {
    components:{
        AppHeader,
        AppLeaderboard,
        AppQuestion
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
        user(){
            return this.$store.state.user
        }
    },
   created(){
    this.$store.dispatch('fetchQuestions')
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
}
/* aside.leaderboard{

}
.question{
    display: relative;
} */
.countdown{
    display: none;
    position: absolute;
    bottom: 0;
}
main{
    margin-right: auto;
}
@media (max-width: 700px) {
    aside.leaderboard {
        display: none;
    }
}

</style>
