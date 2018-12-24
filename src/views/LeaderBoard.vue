<template>
  <app-leaderboard :scores=scores v-if="scores.length"></app-leaderboard>
</template>

<script>
import AppLeaderboard from '@/components/AppLeaderboard'
import {db} from './../store/modules/firebase'

export default {
  components: {
    AppLeaderboard
  },
  data() {
    return {
      scores : []
    }
  },

  async created(){
    const scores = await db.collection('players')
      .orderBy('progress.score')
      .limit(10)
      .get()
      .then(async querySnapshot => {
        if(querySnapshot.size){
          let docs = []
          querySnapshot.docs.forEach( docSnapshot => {
              const data = docSnapshot.data()
              docs.push({username: data.profile.username, score: data.progress.score, rank: data.progress.rank})
          })
         return Promise.resolve(docs)
        }
      })
      .catch( err => {
        console.dir(err)
      })
      
      this.scores = scores
  }
}
</script>

<style>

</style>
