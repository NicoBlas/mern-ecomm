import * as firebase from "firebase"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD03RCqA0o0Y2BEJidk19lnAmxKRq3uPto",
  authDomain: "ecommerce-8c924.firebaseapp.com",
  projectId: "ecommerce-8c924",
  storageBucket: "ecommerce-8c924.appspot.com",
  messagingSenderId: "140032611577",
  appId: "1:140032611577:web:b1c18d79ef3e540657fe28",
  measurementId: "G-NL6YBTT5MJ"
};

//inicialization
firebase.initializeApp(firebaseConfig)

//export

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
