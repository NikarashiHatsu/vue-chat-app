<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-6">
      <div class="card">
        <div class="card-header">
          <i class="fas fa-sign-in-alt"></i>
          <span class="ml-3">
            Login page
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="email">
                Email address
              </label>
              <input v-model="user.email" type="email" id="email" class="form-control" placeholder="johndoe@example.com" required>
              <small class="form-text text-muted">You registered your email to me, be responsible to your own email</small>
            </div>
            <div class="form-group">
              <label for="password">
                Password
              </label>
              <input v-model="user.password" type="password" id="password" class="form-control" placeholder="********" required>
              <small class="form-text text-muted">Please don't forget it... Please don't forget it...</small>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button @click="login" type="submit" class="btn btn-primary">
                Bring me to your world!
              </button>
              <small>
                Oh no, <router-link :to="{ name: 'Forgot' }">I forgot my password!</router-link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'Login',
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },

    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user != null) {
          this.$router.push({ name: 'Homepage' });
        }
      });
    },

    methods: {
      login() {
        var user = this.user;

        if(user.email != '' && user.password != '') {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch((err) => {
            var errCode = err.code;
            var errMsg = err.message;

            switch (errCode) {
              case 'auth/invalid-email':
                alert('Your email address is not valid. Use your usual email address please.');
                break;

              case 'auth/user-disabled':
                alert('Your email has been disabled. Did you violate our terms and conditions?');
                break;

              case 'auth/user-not-found':
                alert('Your credential is not found. Have you registered already?');
                break;

              case 'auth/wrong-password':
                alert('Wrong password! Have you forgotten it?');
                break;

              default:
                alert(errMsg);
                break;
            }
          });
        }
      }
    }
  }
</script>