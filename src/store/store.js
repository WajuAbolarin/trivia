import Vue from "vue";
import Vuex from "vuex";
import questions from './modules/questions';
import player from './modules/player';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    questions,
    player
  }
});
