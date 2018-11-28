import Vue from "vue";
import Vuex from "vuex";
import Questions from './modules/questions/questions'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: ''
  },
  getters:{
    user: (state)=>{
      return state.user
    }
  },
  mutations: {
    SET_USER(state, name){
      state.user = name
    }
  },
  actions: {
    setUsername({commit}, name){
      commit('SET_USER', name)
    }
  },
  modules: {
    questions: Questions
  }
});
