import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyA0xbcE6IVcntSKh4f0FJfSwtz3LJ4QV-o",
    authDomain: "explore-engineer-1553097755430.firebaseapp.com",
    databaseURL: "https://explore-engineer-1553097755430.firebaseio.com",
    projectId: "explore-engineer-1553097755430",
    storageBucket: "explore-engineer-1553097755430.appspot.com",
    messagingSenderId: "274585217912"
  };
  if(!firebase.apps.length) {
    // firebase.initializeApp({});
    firebase.initializeApp(config);
}

export default firebase;