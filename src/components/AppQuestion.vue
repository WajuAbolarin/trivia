<template>
    <main>
        <div class="question-wrapper pt-1">
          <div class="question-countdown">
            <p
              class="question primary-text text-shadow"
              v-html="question.question">

            </p>

            <app-countdown
              :key="question.question" 
              :initial-time="timeLeft"
            />
          </div>
          <ul class="options mt-3" :class="{'already-answered': alreadyAnswered}">
            <li 
              class="option black"
              v-for="(option, i) in options"
              :key="option"
              :ref="`option-${i}`"
              @click="questionAnswered(option, i)"
              v-html="option"
              >
            </li>
            
          </ul>
        </div>
            
    </main>    
</template>

<script>
import AppCountdown  from '@/components/AppCountdown'
import {ACTIONS } from './../store/modules/questions/types'


export default {
  components:{AppCountdown},
  props: { 
    question: {
        required: true, 
        type: Object
        },
  },
  data () {
    return {
      alreadyAnswered: false,
      chosenOptionIndex: null,
      timeLeft: 15
    }
  },
  computed:{
    options() {
        return [...this.question.incorrect_answers, this.question.correct_answer].sort()
    },
    timer(){
      return this.timeLeft
    }
  },
  methods:{
    async questionAnswered(option, i){
      this.alreadyAnswered = true 
      const {mutation, classToAdd} = await this.$store.dispatch(ACTIONS.EVALUATE_ANSWER, option)
      await this.addClass(i, classToAdd)
      await this.resetClasses(classToAdd,i)
      this.$store.dispatch(ACTIONS.TO_NEXT_QUESTION, mutation)
            
    },
    addClass(i, classToAdd){

      return new Promise((resolve, reject)=>{
        setTimeout(() => {
          const index = this.options.indexOf(this.question.correct_answer)
          const rightOption = this.$refs[`option-${index}`]
          if(rightOption){
            rightOption[0].classList.add('is-correct')
          }

          const option = this.$refs[`option-${i}`]
            
          if(option){
                option[0].classList.add(classToAdd)
                resolve()
            }
          
          }, 1500)
      })
    },
    resetClasses(classToRemove, i){
      return new Promise((resolve, reject)=>{
      setTimeout(() => {
        const option = this.$refs[`option-${i}`]
        if(option){
          this.$refs[`option-${i}`][0].classList.remove(classToRemove)
          resolve('done')
        } 
        
        }, 1000)
      })
    }
  },
  watch: {
   async question(){
      this.alreadyAnswered = false
      this.chosenOptionIndex = null
      this.timeLeft = 15
      await this.resetClasses()
      this.nextTick()
    }
  },   
}
</script>

<style>
.question-wrapper {
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 60vh;
  overflow: scroll;
}
.question-countdown{
  min-height: 70%;
  height: 70%;
}
.question {
  text-align: center;
  font-size: 1.5rem;
}
.options {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.5em;
  align-items: center;
  font-size: 0.6rem;
  font-weight: bold;
}
.option {
  padding: 0.8em 1.3em;
  margin: 1em 2.5%;
  width: 45%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.option:hover,
.option.is-correct,
.option.is-wrong {
  border: 1px solid rgba(255, 255, 255, 1);
  background: rgb(255, 216, 61);
  transform: scale(1.1);
}
.option.is-correct {
  background: rgba(20, 255, 20, 0.3);
  transform: scale(1.1);
}
.option.is-wrong {
  background: rgba(255, 70, 50, 0.3);
}

ul.already-answered li {
  pointer-events: none;
}
</style>
