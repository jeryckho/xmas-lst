import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyAa-bH8cBW7Nxd41pOuNY9KRdv-rgdRLR8",
    authDomain: "xmas-lst.firebaseapp.com",
    databaseURL: "https://xmas-lst.firebaseio.com",
    projectId: "xmas-lst",
    storageBucket: "xmas-lst.appspot.com",
    messagingSenderId: "825245328564"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}
