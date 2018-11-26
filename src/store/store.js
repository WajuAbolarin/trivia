import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    currentQuestionIndex: null,
  },
  mutations: {
    SET_QUESTIONS (state, questions){ 
      state.questions = questions
    }
  },
  actions: {
    setQuestions ({ commit }, questions) {
      commit('SET_QUESTIONS', questions)
    },

    fetchQuestions ( {commit},){
      axios.get('/data/questions.json')
            .then(resp => console.dir(resp))
    }
  }
});
