<template>
    <div>
        <app-header></app-header>
        <div class="wrap">
            <app-question :question="dummyQuestion"></app-question>
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
    data(){
        return {
            dummyQuestion:  {
                category: "General Knowledge",
                type: "multiple",
                difficulty: "medium",
                question: "Which river flows through the Scottish city of Glasgow?",
                correct_answer: "Clyde",
                incorrect_answers: [
                    "Tay",
                    "Dee",
                    "Tweed"
                ]
            },
                        
        }
    }

}
</script>

<style>
.wrap {
    display: flex;
    justify-content: space-between;
}
aside.leaderboard{

}
.question{
    /* display: relative; */
}
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
