import axios from 'axios'
import {ACTIONS, MUTATIONS} from './types'


export default {
    [ACTIONS.SET_QUESTIONS] ({ commit }, questions) {
      commit(MUTATIONS.SET_QUESTIONS, questions)
    },

    [ACTIONS.FETCH_QUESTIONS] ( {dispatch},){
      return axios.get('/data/questions.json')
            .then(({data}) => {
              dispatch(ACTIONS.SET_QUESTIONS, data.results)
              return Promise.resolve('done fetching questions')
            })
    },

    async [ACTIONS.NEXT_QUESTION_SET]({state, commit, dispatch}){
      if(state.currentSet < 5){
        commit(MUTATIONS.NEXT_QUESTION_SET)
        return
      }
      await dispatch(ACTIONS.FETCH_QUESTIONS)
      commit(MUTATIONS.RESET_CURRENT_SET)
    },

    async [ACTIONS.TO_NEXT_QUESTION] ({state, commit, dispatch}, mutation ){
    
      if (state.currentQuestionIndex == 9) {
        await dispatch(ACTIONS.NEXT_QUESTION_SET)
        commit(MUTATIONS.RESET_QUESTION_INDEX)
        return
      }
      commit(MUTATIONS.INCREASE_QUESTION_INDEX)
      if(null != mutation ){
        commit('UPDATE_PROGRESS', {
          currentQuestionIndex: state.currentQuestionIndex,
          currentQuestionSet: state.currentSet
        })
        dispatch('UPDATE_SCORE', mutation)
      }
    },


    [ACTIONS.EVALUATE_ANSWER] ({commit, getters, dispatch}, choosenOption) {
        return new Promise( (resolve, reject)=> {        
          const currentQuestion = getters.currentQuestion;

          const mutationAndClass = choosenOption == currentQuestion.correct_answer ? 
                      {mutation: MUTATIONS.INCREASE_SCORE , classToAdd: 'is-correct'}:
                      {mutation: MUTATIONS.DECREASE_SCORE, classToAdd: 'is-wrong'}
        
                      return resolve(mutationAndClass)
      })
    }
    
}