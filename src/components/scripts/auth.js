import firebase from 'firebase'

var Login = {
  // User credential
  user: {
    email: '',
    password: '',
  },

  // Register function
  register: function(user) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch((err) => {
      // TODO: Make error handling
      console.log(err);
    });
  },
  
  // Sign in the user
  signIn: function(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch((err) => {
      // TODO: Make error handling
      console.log(err);
    });
  },

  // Sign out the user
  signOut: function() {
    firebase.auth().signOut();
  },

  // Observer if user is signed in or signed out
  userObserver: function() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        // TODO: Make actions if user is signed in
        console.log('User is signed in');
      }
    });
  }
}

export default Login;