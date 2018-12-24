
import getters from './getters'
import mutations from './mutations'
import actions from './actions'



export default {
  state: {
    questions: [],
    currentSet: 1,
    currentQuestionIndex: 0,
  },
  mutations,
  getters,
  actions
}
