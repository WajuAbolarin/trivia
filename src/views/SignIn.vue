<template>
  <div class="sign-in-wrapper">
    <h1 class="primary-text text-shadow centered-text">Welcome</h1>
    <p class="centered-text black mt-3">Enter a username to play</p>
    <form @submit.prevent="submitForm" class="auth-form">
      <input type="text" v-model.lazy="username" class="input-field centered-text alt-text username-input">
    </form>

    <small class="primary-text" v-if="validationMessage" v-text="validationMessage"></small>    
    <button v-if="showSignIn" @click="signInWithGoogle"> Sign in with Google </button>
    <p v-if="usernameIsValid" class="black">Get Started <router-link to="/game" tag="span" class="forward-arrow">&#8594;</router-link></p> 
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
        validationMessage: null,
        newPlayer : true,
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
        
        if(!playerData) {
          return this.doAnonymousSignIn()
        }

        this.playerData = playerData

        return this.doRegularSignIn()

      },
      
      async doRegularSignIn(){
        if(!this.playerData.profile.userToken){      
          return this.linkUserAccount()
        } 

        this.validationMessage = `Oops! ${this.username} is already taken, please try another username or sign in if you are ${this.username}`
        this.showSignIn = true
      },


      async signInWithGoogle(){
        console.log('signing in with Google')
        this.showSignIn = false
        this.validationMessage  = null

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

                this.validationMessage = `Please sign up with your linked google account or if you are not ${this.username} please choose a username to start`
                this.showSignIn = true

                this.$store.commit(MUTATIONS.SET_PLAYER, this.freshUserDetails) 
                this.$store.commit(MUTATIONS.SET_PLAYER_ID, null) 
                result.user.delete()
                auth.signOut()
              })
              .catch(err => {
                console.dir(err.message)
                
              })
          })
      },

      async linkUserAccount() {
        /** @todo get log the user in using their credential and then link their account */
        console.log('linking with Google')

        this.showSignIn = false
        this.validationMessage  = null
        
        auth.currentUser.linkWithPopup( new firebase.auth.GoogleAuthProvider() )
          .then( result => {
            
            const token  = result.credential.idToken 

            //get user credential and add it to the user details on firebase to determine if the user is anon or not
                      
            db.collection('players').where('profile.userId', '==', result.user.uid).get()
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
        auth.signOut()
        
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
        this.validationMessage = null
      },

      setMessage(message){
        this.validationMessage = message
      }
    },
    computed: {
      usernameIsValid ()
      {
        return !this.validationMessage && this.username
      }
    },
    created(){
      
      console.log('on created user is')
      console.dir(auth.currentUser)
    }
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
</style>
