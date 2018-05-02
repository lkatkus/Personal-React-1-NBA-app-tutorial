import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBj9pWU7nKDwd3FBl5NyFYLCaJjJSMlMrM",
    authDomain: "nba-tutorial.firebaseapp.com",
    databaseURL: "https://nba-tutorial.firebaseio.com",
    projectId: "nba-tutorial",
    storageBucket: "nba-tutorial.appspot.com",
    messagingSenderId: "896301402144"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseVideos,
    firebaseTeams
}