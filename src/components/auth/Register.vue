<template>
  <!-- Register content here -->
  <!--
    TODO:
    1. Make a form validation
    2. Make an alert if:
      a. User is successfully registered
        i. Give them a link to login
      b. User is failed to register
      c. Email is already registered
      d. Firebase is having a problem
    DONE:
    1. Make a registration form here
    2. Registration form consists:
      a. Email
      b. Username
      c. Password
      d. Password confirmation
  -->
  <div class="row justify-content-center">
    <div class="col-12 col-lg-6">
      <div class="card">
        <div class="card-header">
          <i class="fab fa-wpforms"></i>
          <span class="ml-3">
            Register page
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="email">
                Email address
              </label>
              <input v-model="user.email" type="email" id="email" class="form-control" placeholder="johndoe@example.com" required>
              <small class="form-text text-muted">You will use your email to log in</small>
            </div>
            <div class="form-group">
              <label for="username">
                Username
              </label>
              <input v-model="user.username" type="text" id="username" class="form-control" placeholder="John Doe" required>
              <small class="form-text text-muted">Use your desired username</small>
            </div>
            <div class="form-group">
              <label for="password">
                Password
              </label>
              <input v-model="user.password" type="password" id="password" class="form-control" placeholder="********" required>
              <small class="form-text text-muted">As a recommendation, please use 8 character long password</small>
            </div>
            <div class="form-group">
              <label for="confirmPassword">
                Confirm password
              </label>
              <input v-model="user.confirmPassword" type="password" id="confirmPassword" class="form-control" placeholder="********" required>
              <small class="form-text text-muted">I'm pretty sure you still remember password you typed above</small>
            </div>
            <button @click="register" type="submit" class="btn btn-primary">
              Register me in!
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'Register',
    data() {
      return {
        user: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    mounted() {
      var user = firebase.auth().currentUser;

      if(user != null) {
        this.$router.push({ name: 'Homepage' }); 
      }
    },
    methods: {
      register() {
        const user = this.user;
        
        if((user.username != '' && user.email != '' && user.password != '' && user.confirmPassword != '') && (user.password === user.confirmPassword)) {
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch((err) => {
            var errCode = err.code;
            var errMsg = err.message;

            switch (errCode) {
              case 'auth/email-already-in-use':
                alert('Your email is already used. Is it you or your doppelganger?');
                break;
            
              case 'auth/invalid-email':
                alert('Your email address is not valid. Use your usual email address please.');
                break;

              case 'auth/weak-password':
                alert('Seriously? With that kind of password? Make stronger one!');
                break;

              default:
                alert(errMsg);
                break;
            }
          });

          firebase.database().ref('users').push({
            email: user.email,
            username: user.username
          });
          
          this.$router.push({ name: 'Homepage' });
        }
      }
    }
  }
</script>