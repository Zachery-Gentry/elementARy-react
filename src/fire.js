import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDevBy4ttEPuwKIkXeQ_jWPYqX7aU8wLm8",
    authDomain: "myelementarywatson.firebaseapp.com",
    databaseURL: "https://myelementarywatson.firebaseio.com",
    projectId: "myelementarywatson",
    storageBucket: "myelementarywatson.appspot.com",
    messagingSenderId: "659403068573"
  };

var fire = firebase.initializeApp(config);

export default fire;