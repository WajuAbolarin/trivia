import * as firebase from 'firebase';

firebase.initializeApp(
    {
      apiKey: 'AIzaSyCMewMSS9L5YOQlonFIzpGOEi321u8Wdqo',
      authDomain: 'waju-trivia.firebaseapp.com',
      databaseURL: 'https://waju-trivia.firebaseio.com',
      projectId: 'waju-trivia',
    }
)

const db = firebase.firestore()

db.settings({
        timestampsInSnapshots: true
})

const auth = firebase.auth()

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)




export  { 
    db,
    auth
}