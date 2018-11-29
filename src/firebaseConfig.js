import firebase from "firebase";
import "firebase/firestore";
import {config} from "./firebaseSecret.js";

firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
	timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const listsCollection = db.collection("listes");
const detailsCollection = db.collection("details");

export { db, auth, currentUser, listsCollection, detailsCollection };
