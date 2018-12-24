<template>
  <div class="wrapper home-wrapper">
    <h1 class="primary-text text-shadow centered-text">Welcome to its just TRIVIA</h1>
    <h3 class="text-shadow">Input your username to join us</h3>
    <form @submit.prevent="submitForm">
      <input type="text" v-model.lazy="username" class="input-field centered-text alt-text">
    </form>

    <small class="primary-text" v-if="validationMessage" v-text="validationMessage"></small>    
    
    <p v-if="usernameIsValid">Get Started <router-link to="/game" tag="span" class="forward-arrow">&#8594;</router-link></p> 
  </div>
</template>

<script>
import { ACTIONS } from './../store/modules/player/types'

export default {
  data(){
    return {
      username: '',
      validationMessage: null,
    }
  },
  methods: {
    async submitForm(){
      this.clearValidation()

      const response = await this.$store.dispatch(ACTIONS.CHECK_USERNAME, this.username)
    
      if(response.status == 'invalid'){
          return this.setMessage(response.message)
      }
      const signIn = await this.$store.dispatch(ACTIONS.SIGN_IN, this.username)

      //here call router push
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
  }
}
</script>

<style >
</style>
