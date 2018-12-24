import getters  from './getters'
import mutations  from './mutations'
import actions  from './actions'


export default {
    state: {
        player: {
            profile: {},
            progress: {},
        },
        playerId: null,
    },
    getters,
    mutations,
    actions,
}