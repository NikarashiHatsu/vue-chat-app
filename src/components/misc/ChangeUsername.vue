<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-6">
      <div class="card">
        <div class="card-header">
          <i class="fas fa-cog"></i>
          <span class="ml-3">
            <router-link :to="{ name: 'Settings' }">
              Settings
            </router-link>
            <span>
              /
            </span>
            <span>
              Change Username
            </span>
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="newUsername">New username</label>
              <input v-model="user.username" type="text" id="newUsername" class="form-control" placeholder="New John Doe">
              <small class="form-text text-muted">You won't be abusing this feature aren't you?</small>
            </div>
            <button @click="changeUsername()" class="btn btn-success">
              Give me my new identity!
            </button>
            <router-link :to="{ name: 'Settings' }" class="btn btn-outline-danger ml-0 ml-lg-3">
              Wait, don't!
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'ChangeUsername',

    data() {
      return {
        user: {
          username: ''
        }
      }
    },

    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user == null) {
          this.$router.push({ name: 'Homepage' });
        }
      });
    },
    
    methods: {
      changeUsername() {
        if(this.user.username != '') {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.user.username
          }).then(() => {
            this.$router.push({ name: 'Homepage' });
          }).catch((err) => {
            alert(err);
          });
        }
      }
    }
  }
</script>