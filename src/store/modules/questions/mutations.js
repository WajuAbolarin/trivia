import { MUTATIONS } from './types'
export default {
    [MUTATIONS.SET_QUESTIONS] (state, questions){ 
      state.questions = questions
    },

    [MUTATIONS.NEXT_QUESTION_SET](state){
      state.currentSet++
    },
    
    
    [MUTATIONS.INCREASE_QUESTION_INDEX] (state) {
      state.currentQuestionIndex++
    },

    [MUTATIONS.RESET_QUESTION_INDEX] (state) {
      state.currentQuestionIndex = 0
    },
    
    [MUTATIONS.RESET_CURRENT_SET](state){
      state.currentSet = 1
    },

    [MUTATIONS.SYNC_STATE] (state, { currentQuestionSet, currentQuestionIndex}){      
      state.currentSet = currentQuestionSet
      state.currentQuestionIndex = currentQuestionIndex
    }
}