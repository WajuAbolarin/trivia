import axios from 'axios'


const PENALTY_SCORE = 50
const REWARD_SCORE = 100

export default {
  state: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
  },
  mutations: {
    SET_QUESTIONS (state, questions){ 
      state.questions = questions
    },
    SET_CURRENT_QUESTION(){

    },
    SET_CURRENT_QUESTION_INDEX(){

    },
    INCREASE_SCORE (state) {
      state.score += REWARD_SCORE
    },

    DECREASE_SCORE (state) {
      state.score -= PENALTY_SCORE
    },
    INCREASE_QUESTION_INDEX (state) {
      state.currentQuestionIndex++
    },
  },
  getters: {
    currentQuestion: (state) =>{
      return state.questions[state.currentQuestionIndex]
    },
    score: (state) =>{
        return state.score
    },
    questionPercentage:(state) => {
        return ( (state.currentQuestionIndex + 1) / state.questions.length ) * 100   
    }
  },
  actions: {
    setQuestions ({ commit }, questions) {
      commit('SET_QUESTIONS', questions)
    },

    fetchQuestions ( {dispatch},){
      axios.get('/data/questions.json')
            .then(({data}) => dispatch('setQuestions', data.results))
    },
    updateCurrentQuestionIndex ({state, commit}){
      if(state.currentQuestionIndex != ( state.questions.length - 1 ) ) 
      commit('INCREASE_QUESTION_INDEX')
    },
    evaluateAnswer ({commit, getters, dispatch}, choosenOption) {
        setTimeout(()=>{
            const currentQuestion = getters.currentQuestion;
            if(choosenOption == currentQuestion.correct_answer) {
              commit('INCREASE_SCORE')
              
            }else {
              commit('DECREASE_SCORE')
            }
          dispatch('updateCurrentQuestionIndex')

        }, 2000)
    }
    
  }
}
