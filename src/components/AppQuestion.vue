<template>
    <main>
        <div class="question-wrapper">
            <h3
              class="question primary-text text-shadow"
              v-html="question.question">

            </h3>

            <app-countdown
            :time-left="timeLeft"
            />

          <ul class="options" :class="{'already-answered': alreadyAnswered}">
            <li 
              class="option black "
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
      const {mutation, classToAdd} = await this.$store.dispatch('evaluateAnswer', option)
      await this.addClass(i, classToAdd)
      await this.resetClasses(classToAdd,i)
      this.$store.dispatch('toNextQuestion', mutation)
            
    },
    unescape(val){
      return unescape(val)
    },
    addClass(i, classToAdd){
      return new Promise((resolve, reject)=>{
          setTimeout(() => {
            this.$refs[`option-${i}`][0].classList.add(classToAdd)
           resolve()
          
          }, 1000)
      })
    },
    resetClasses(classToRemove, i){
      return new Promise((resolve, reject)=>{
      setTimeout(() => {
        this.$refs[`option-${i}`][0].classList.remove(classToRemove)
        resolve('done')
        
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
  }
   
}
</script>

<style>
.question-wrapper {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.question {
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  /* outline: 1px solid yellow; */
}
.options {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10%;
  align-items: center;
  /* box-shadow: 1px 20px 15px rgba(0,0,0,0.2); */
  font-size: 20px;
  font-weight: bold;
}
.option {
  padding: 15px 25px;
  margin: 10px 5px;
  /* outline: 1px solid lime; */
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.6s ease-in-out;
}
.option:hover,
.option.is-correct,
.option.is-wrong {
  border: 2px solid rgba(255, 255, 255, 1);
  background: rgb(255, 216, 61);
  transform: scale(1.1);
}
.option.is-correct {
  background: rgba(20, 255, 20, 0.4);
}
.option.is-wrong {
  background: rgba(255, 70, 50, 0.6);
}
.countdown {
  font-size: 55px;
  font-style: italic;
}
ul.already-answered li {
  pointer-events: none;
}
</style>
