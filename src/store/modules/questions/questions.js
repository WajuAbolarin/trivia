import axios from 'axios'


const PENALTY_SCORE = 50
const REWARD_SCORE = 100

export default {
  state: {
    questions: [],
    currentSet: 1,
    currentQuestionIndex: 0,
    score: 0,
  },
  mutations: {
    SET_QUESTIONS (state, questions){ 
      state.questions = questions
    },
    NEXT_QUESTION_SET(state){
      state.currentSet++
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
    RESET_QUESTION_INDEX (state) {
      state.currentQuestionIndex = 0
    },
    RESET_CURRENT_SET(state){
      state.currentSet = 1
    }
  },
  getters: {
    currentQuestionSet: (state) =>{
      const start = (state.currentSet * 10) - 10
      const end = start + 10;

      return state.questions.slice(start, end)
      
    },
    currentQuestion: (state, getters) =>{
      return getters.currentQuestionSet[state.currentQuestionIndex]
    },
    score: (state) =>{
        return state.score
    },
    currentSet: (state) =>{
      return state.currentSet
  },
    questionPercentage:(state) => {
        return ( (state.currentQuestionIndex + 1) / 10 ) * 100   
    }
  },
  actions: {
    setQuestions ({ commit }, questions) {
      commit('SET_QUESTIONS', questions)
    },

    fetchQuestions ( {dispatch},){
      return axios.get('/data/questions.json')
            .then(({data}) => {
              dispatch('setQuestions', data.results)
              return Promise.resolve('done fetching questions')
            })
    },
    async nextQuestionSet({state, commit, dispatch}){
      if(state.currentSet < 5){
        commit('NEXT_QUESTION_SET')
        return
      }
      await dispatch('fetchQuestions')
      commit('RESET_CURRENT_SET')
    },
   async toNextQuestion ({state, commit, dispatch}, mutation ){
    
      if (state.currentQuestionIndex == 9) {
        await dispatch('nextQuestionSet')
        commit('RESET_QUESTION_INDEX')
        return
      }
      commit('INCREASE_QUESTION_INDEX')
      commit(mutation)

    },

    evaluateAnswer ({commit, getters, dispatch}, choosenOption) {
      return new Promise( (resolve, reject)=> {        
          const currentQuestion = getters.currentQuestion;

          const mutationAndClass = choosenOption == currentQuestion.correct_answer ? 
                      {mutation:'INCREASE_SCORE', classToAdd: 'is-correct'}:
                      {mutation:'DECREASE_SCORE', classToAdd: 'is-wrong'}
        
                      return resolve(mutationAndClass)
      })
    }
    
  }
}
