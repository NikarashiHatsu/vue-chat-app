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
              Change Email
            </span>
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="newEmail">New email address</label>
              <input v-model="user.email" type="email" id="newEmail" class="form-control" placeholder="newjohndoe@example.com">
              <small class="form-text text-muted">You won't be abusing this feature aren't you?</small>
            </div>
            <button @click="changeEmail()" class="btn btn-success">
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
    name: 'ChangeEmail',

    data() {
      return {
        user: {
          email: ''
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
      changeEmail() {
        if(this.user.email != '') {
          firebase.auth().currentUser.updateEmail(this.user.email).then(() => {
            this.$router.push({ name: 'Homepage' });
          }).catch((err) => {
            alert(err);
          });
        }
      }
    }
  }
</script>