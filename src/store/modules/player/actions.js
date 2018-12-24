import {ACTIONS, MUTATIONS} from './types';
import { db, auth }  from './../firebase'

export default {
  [ACTIONS.SET_PLAYER] ({commit}, playerDetails) {

      commit(MUTATIONS.SET_PLAYER, playerDetails)

      const {progress} = JSON.parse( JSON.stringify( playerDetails ) ) 
      commit('SYNC_STATE', progress)
  
  },

  async [ACTIONS.ADD_USER_TOKEN] ({state}, token) {

    await db.collection('players').doc(state.playerId).update('profile.userToken', token)
    return Promise.resolve()

  },

  async [ACTIONS.UPDATE_SCORE] ({dispatch,commit, state}, mutation) {   
    commit(mutation)
    await dispatch(ACTIONS.UPDATE_PLAYER_FIRESTORE)
  },
  
  async [ACTIONS.UPDATE_PLAYER_FIRESTORE] ({state}) {
    const playerDetails = JSON.parse(JSON.stringify(state.player))
    
    try {
      await db.collection('players')
        .doc(state.playerId)
        .set(playerDetails)
      
    } catch (error) {
      console.dir(error)
    }

  },

  async [ACTIONS.CREATE_PLAYER_FIRESTORE] (context, playerDetails) {
    
      const docRef =  await db.collection('players').add(playerDetails)
        
      const playerSnapshot =  await docRef.get()

      return Promise.resolve( {id: playerSnapshot.id, playerData: playerSnapshot.data()} )
 

  },

  async  [ACTIONS.CHECK_USERNAME] ({dispatch, commit} ,username) {
    
    return  db
        .collection('players').where('profile.username', '==', username)
        .get()
        .then( snapShot => {

          if(snapShot.size){

            commit(MUTATIONS.SET_PLAYER_ID , snapShot.docs[0].id)
            return Promise.resolve({...snapShot.docs[0].data() })

          } else {

            return Promise.resolve(false)
          }
          

        })
        .catch(err => {      
          return Promise.resolve(err)
        })
        
  },

  async  [ACTIONS.ANONYMOUS_SIGNIN] ({dispatch}, username) 
  {
   auth
      .signInAnonymously()
      .catch(err => {
        return Promise.resolve({status: 'valid', message: `Oops!, we are having trouble signing you in ${username}`})
    })
  
  }

}