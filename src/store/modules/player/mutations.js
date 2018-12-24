import {MUTATIONS} from  './types'


const PENALTY_SCORE = 50
const REWARD_SCORE = 100

export default  {
    [MUTATIONS.SET_PLAYER] (state, player){
      state.player = {...player}
    },

    [MUTATIONS.SET_PLAYER_ID] (state, id){
      state.playerId = id
    },

    [MUTATIONS.INCREASE_SCORE] (state) {
      state.player.progress.score += REWARD_SCORE
    },

  [MUTATIONS.DECREASE_SCORE] (state) {
    state.player.progress.score -= PENALTY_SCORE
  },

  [MUTATIONS.UPDATE_PROGRESS] (state, progress) {

    const newProgress = Object.assign({}, state.player.progress, progress)
    
    state.player.progress = newProgress
  },
}