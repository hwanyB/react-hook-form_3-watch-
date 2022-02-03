import firebase from "firebase/app";
import auth from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPV_wP2sI9bmFBY5IIz42N2_OXNz9ifqA",
  authDomain: "twitterclonecoding-a92ff.firebaseapp.com",
  projectId: "twitterclonecoding-a92ff",
  storageBucket: "twitterclonecoding-a92ff.appspot.com",
  messagingSenderId: "48000302614",
  appId: "1:48000302614:web:32bbf2b95ffba9dde6ff37",
};

firebase.initializeApp(firebaseConfig);


export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();