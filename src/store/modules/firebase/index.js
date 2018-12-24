import * as firebase from 'firebase';

firebase.initializeApp(
    {
      apiKey: process.env.VUE_APP_FIREBASE_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_ID,
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