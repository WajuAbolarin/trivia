<template>
  <div class="view sign-in-wrapper">
    <h1 class="primary-text text-shadow centered-text">Welcome</h1>
    
    <p  class="centered-text black mt-3 text-bold">Enter a username to play</p>
    
    <form @submit.prevent="submitForm" class="auth-form">
      <input type="text" v-model.lazy="username" class="input-field centered-text alt-text username-input">
    </form>

    <small class="primary-text centered-text mx-1 validation-message" v-if="message" v-text="message"> </small>    
    <button class="sign-in-button primary-text mt-2" v-if="showSignIn" @click="doRegularSignIn">
      <span> 
        <img src="./../assets/google.png" alt="google-logo" class="google-logo">
      </span>
      Sign in with Google
    </button>

    <button class="sign-out-button primary-text mt-2" v-if="showSignIn" @click="signOut">
      <!-- <span> 
        <img src="./../assets/google.png" alt="google-logo" class="google-logo">
      </span> -->
      Sign Out!
    </button>
        
  </div>
</template>

<script>
  import { ACTIONS, MUTATIONS } from './../store/modules/player/types'
  import {auth, db} from './../store/modules/firebase'
  import * as firebase from 'firebase'

  export default {
    data(){
      return {
        username: '',
        message: null,
        showSignIn: false,
        playerData: {},
        freshUserDetails: {
            profile: { username: null, userToken: null},
            progress: {score: 0, rank : 'Beginner', currentQuestionSet:1, currentQuestionIndex: 0}
        },
      }
    },
    methods: {
      async submitForm(){
        this.clearValidation()
        console.log('submitting form')
        const playerData = await this.$store.dispatch(ACTIONS.CHECK_USERNAME, this.username)      
        
        if(playerData) {
          this.message = `Oops! ${this.username} is already taken, please try another one or sign in if you are ${this.username}`
          this.playerData = playerData
        }
        this.showSignIn = true

        // return this.doAnonymousSignIn()
        // this.message = `Oops! ${this.username} is already taken, please try another one or sign in if you are ${this.username}`
        // this.showSignIn = true

      },
      
      signOut(){
        auth.signOut()
      },

      async doRegularSignIn(){ 
        this.showSignIn = false
        this.message  = null
        // if(auth.currentUser && auth.currentUser.uid == this.playerData.profile.userId){
            // return this.linkUserAccount()
        // }

        // auth.signOut()
        // auth.onAuthStateChanged( user => {
        //   if(!user){
            return this.signInWithGoogle()
          // }
        // })

      },

      async signInWithGoogle(){
        console.log('signing in with Google')

        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
          .then( result => {

            const userData = db.collection('players').where('profile.userId', '==', result.user.uid).get()
              .then( async querySnapshot => {
                
                if(querySnapshot.size){
                  
                  this.$store.commit(MUTATIONS.SET_PLAYER_ID, querySnapshot.docs[0].id)

                  
                  await this.$store.dispatch(ACTIONS.SET_PLAYER, querySnapshot.docs[0].data())

                  return this.$router.push('/game')
                
                }

                const playerDetails = this.freshUserDetails
                
                playerDetails.profile.username = this.username
                playerDetails.profile.userId = result.user.uid

                const {id, playerData} = await this.$store.dispatch(ACTIONS.CREATE_PLAYER_FIRESTORE, playerDetails)

                this.$store.commit(MUTATIONS.SET_PLAYER_ID , id)

                await this.$store.dispatch(ACTIONS.SET_PLAYER, playerData)
                
                return this.$router.push('/game')
              })
              .catch(err => {
                console.dir(err.message)
                
              })
          })
      },

      async linkUserAccount() {
        /** @todo get log the user in using their credential and then link their account */
        console.log('linking with Google')

        auth.currentUser.linkWithPopup( new firebase.auth.GoogleAuthProvider() )
          .then( result => {
                      
            db.collection('players')
              .where('profile.userId', '==', result.user.uid)
              .get()
              .then( async querySnapshot => {
                
                if(querySnapshot.size){
                  
                  this.$store.commit(MUTATIONS.SET_PLAYER_ID, querySnapshot.docs[0].id)
                  await this.$store.dispatch(ACTIONS.ADD_USER_TOKEN, token)
                  await this.$store.dispatch(ACTIONS.SET_PLAYER, querySnapshot.docs[0].data())
                  
                  return this.$router.push('/game')
                
                }
              })
          })
          .catch( err => {
            console.dir(err)
            this.signInWithGoogle()
          })

      },

      async doAnonymousSignIn() {
        
        const resp = await this.$store.dispatch(ACTIONS.ANONYMOUS_SIGNIN, this.username) 
        
        await auth.onAuthStateChanged(async  user => {
        
        if(user) {
          console.log('signed In anonymously')
          const playerDetails = this.freshUserDetails
          
          playerDetails.profile.username = this.username
          playerDetails.profile.userId = user.uid

          const {id, playerData} = await this.$store.dispatch(ACTIONS.CREATE_PLAYER_FIRESTORE, playerDetails)

          this.$store.commit(MUTATIONS.SET_PLAYER_ID , id)

          await this.$store.dispatch(ACTIONS.SET_PLAYER, playerData)
          
          return this.$router.push('/game')
          
        }
        
      })
      },
      clearValidation(){
        this.message = null
      },

      setMessage(message){
        this.message = message
      }
    },
    computed: {
      hasUser(){
        return !!auth.CurrentUser
      },
      usernameIsValid ()
      {
        return !this.message && this.username
      }
    },
  }
</script>

<style >
.sign-in-wrapper{
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.auth-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em auto;
}
.username-input{
  font-size: 0.9em;
  width: 70%;
}

.sign-in-button,
.sign-out-button{
  background: transparent;
  border: .8px solid rgba(255,255,255,0.4);
  border-radius: 2px;
  padding: 0.5em 0.7em;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
}
.google-logo{
  width: 15px;
  height: 15px;
  margin-right: 0.7em;
}
.validation-message{
  line-height: 1.5;
}
</style>
