<template>
  <!-- Settings content here -->
  <!--
    TODO:
    1. All of the functionality
    DONE:
    1. User settings
      b. Change user's profile picture
      c. Change user's email address
      d. Change user's password
    2. Chat settings
      a. Change theme from light to dark or vice-versa
  -->
  <div class="row justify-content-center">
    <div class="col-12 col-lg-4">
      <div class="card">
        <div class="card-header">
          <i class="fas fa-cog"></i>
          <span class="ml-3">
            Settings
          </span>
        </div>
        <div class="list-group list-group-flush">
          <div class="list-group-item d-flex flex-column">
            <div class="d-flex border rounded-circle align-self-center justify-content-center align-items-center text-center small" style="width: 100px; height: 100px;">
              Photo (click to change)
            </div>
            <h5 class="mt-3 align-self-center">
              {{ user.username }}
            </h5>
          </div>
          <router-link :to="{ name: 'ChangeUsername' }" class="list-group-item btn btn-outline-primary text-left">
            <i class="fas fa-user"></i>
            <span class="ml-3">
              Change username
            </span>
          </router-link>
          <router-link :to="{ name: 'ChangeEmail' }" class="list-group-item btn btn-outline-primary text-left">
            <i class="fas fa-envelope"></i>
            <span class="ml-3">
              Change email
            </span>
          </router-link>
          <router-link :to="{ name: 'ChangePassword' }" class="list-group-item btn btn-outline-primary text-left">
            <i class="fas fa-lock"></i>
            <span class="ml-3">
              Change password
            </span>
          </router-link>
          <button @click="logout" class="list-group-item btn btn-outline-danger text-left">
            <i class="fas fa-sign-out-alt"></i>
            <span class="ml-3">
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4 mt-3 mt-lg-0">
      <div class="card">
        <div class="card-header">
          <i class="fas fa-comment"></i>
          <span class="ml-3">
            Chat settings
          </span>
        </div>
        <div class="list-group">
          <div class="list-group-flush">
            <div class="list-group-item d-flex justify-content-between">
              <span>
                Dark mode
              </span>
              <span>
                <input class="form-check-input" type="checkbox" value="darkModeEnable" id="darkMode">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'Settings',

    data() {
      return {
        user: {
          username: ''
        }
      }
    },

    mounted() {
      var auth = firebase.auth();
      
      auth.onAuthStateChanged((user) => {
        if(user == null) {
          this.$router.push({ name: 'Homepage' });
        } else {
          this.user.username = firebase.auth().currentUser.displayName;
        }
      });
    },
    
    methods: {
      logout() {
        firebase.auth().signOut();
      }
    }
  }
</script>