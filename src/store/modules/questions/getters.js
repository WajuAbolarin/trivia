export default {
    currentQuestionSet: (state) =>{
        const start = (state.currentSet * 10) - 10
        const end = start + 10;
        
        return state.questions.slice(start, end)
        
    },
 
    currentQuestion: (state, getters) =>{
        return getters.currentQuestionSet[state.currentQuestionIndex]
    },
 
    score: (state, getters,rootState) =>{

        return rootState.player.player.progress.score
    },
 
    currentSet: (state) =>{
        return state.currentSet
    },
 
    questionPercentage:(state) => {
        return ( (state.currentQuestionIndex + 1) / 10 ) * 100   
    }
}