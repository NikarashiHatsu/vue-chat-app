<template>
  <div class="container">
    <div class="row justify-content-center my-4" id="app">
      <div class="col-4" id="temporaryNav">
        Temporary navigation
        <ul>
          <li>
            <router-link :to="{ name: 'Homepage' }">Homepage</router-link>
          </li>
          <hr />
          <li>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Register' }">Register</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Forgot' }">Forgot</router-link>
          </li>
          <hr />
          <li>
            <router-link :to="{ name: 'Hall' }">Chat Hall</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Chat', params: { userId: 'nikarashihatsu' } }">Chat</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'GroupChat', params: { groupId: 'hatsucorp' } }">Group Chat</router-link>
          </li>
          <hr />
          <li>
            <router-link :to="{ name: 'Settings' }">Settings</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <router-view></router-view>
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