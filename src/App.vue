<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
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
  import Auth from './components/scripts/auth';

  export default {
    name: 'App',
    data() {
      return {
        user: Auth.user
      }
    },
    
    methods: {
      register() { Auth.register() },
      signIn() { Auth.signIn() },
      signOut() { Auth.signOut() }
    },
  }
</script>