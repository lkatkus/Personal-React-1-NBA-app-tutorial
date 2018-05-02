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

const firebaseLooper = (snapshot) => {
    // PLACEHOLDER FOR DATA ITEMS
    const data = [];

    // GETTING DATA FROM FIREBASE
    snapshot.forEach((childSnapshot)=>{
        // PUSH CHILD DATA TO PLACEHOLDER ARRAY
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });

    // RETURNING DATA TO PARENT
    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseVideos,
    firebaseTeams,
    firebaseLooper
}