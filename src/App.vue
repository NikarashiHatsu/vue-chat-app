<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">

      <!-- Signed out navbar -->
      <div class="container" id="signedOutNavbar">
        <router-link :to="{ name: 'Homepage' }" class="navbar-brand">Firebase Chat App</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigations">
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navigations">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Login' }">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Register' }">Register</router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Signed in navbar -->
      <div class="container" id="signedInNavbar">
        <router-link :to="{ name: 'Homepage' }" class="navbar-brand">Firebase Chat App</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigations">
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navigations">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Hall' }">Chat Hall</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'Settings' }">Settings</router-link>
            </li>
          </ul>
        </div>
      </div>

    </nav>
    <div class="container">
      <div class="row my-4">
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // Firebase init
  import './components/scripts/firebase';
  import firebase from 'firebase';

  export default {
    name: 'App',

    mounted() {
      firebase.auth().onAuthStateChanged((user) => {        
        var navSignedIn = document.getElementById('signedInNavbar');
        var navSignedOut = document.getElementById('signedOutNavbar');

        if(user == null) {
          navSignedIn.classList.add('d-none');
          navSignedIn.classList.remove('d-flex');
          navSignedOut.classList.add('d-flex');
          navSignedOut.classList.remove('d-none');
        } else {
          navSignedIn.classList.add('d-flex');
          navSignedIn.classList.remove('d-none');
          navSignedOut.classList.add('d-none');
          navSignedOut.classList.remove('d-flex');
        }
      });
    },
  }
</script>