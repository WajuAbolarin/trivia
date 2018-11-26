<template>
  <div class="wrapper home-wrapper">
    <h1 class="primary-text text-shadow centered-text">Welcome to its just TRIVIA</h1>
    <h3 class="text-shadow">Input your username to join us</h3>
    <input type="text" v-model="username" class="input-field  centered-text">

      <p v-if="usernameValid">Begin <router-link to="/" tag="span" class="forward-arrow">&#8594;</router-link></p> 
  </div>
</template>

<script>
// import axios from 'axios'


export default {
  data(){
    return {
      username : 'Waju',
      validationMessage: null
    }
  },
  computed: {
    usernameValid(){
      return true
    }
  },
  created(){
    this.$store.dispatch('fetchQuestions')
  }
}
</script>

<style >
p.begin {
  font-size: 2rem;
  cursor: pointer;
}
.forward-arrow{
  font-size: 1.5rem;
  vertical-align: middle;
}
.home-wrapper{
  flex-direction: column;
}
.home-wrapper *{
  margin-bottom: 1.5em;
}
.input-field{
  outline: none;
  border:none;
  background: transparent;
  border-bottom: .8px solid white;
  font-size: 1.4em;
  font-style: italic;
  letter-spacing: 0.12em;
}
</style>
