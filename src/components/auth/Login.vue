<template>
  <!-- Login content here -->
  <!--
    TODO:
    1. Make a form validation
    2. Make an alert if:
      a. User is failed to login
      b. Email is already registered
      c. Either the email or the password is wrong
      d. Firebase is having a problem
    DONE:
    1. Make a login form in this file
    2. Login form consists:
      a. Email
      b. Password
  -->
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
              <input type="email" id="email" class="form-control" placeholder="johndoe@example.com">
              <small class="form-text text-muted">You registered your email to me, be responsible to your own email</small>
            </div>
            <div class="form-group">
              <label for="password">
                Password
              </label>
              <input type="password" id="password" class="form-control" placeholder="********">
              <small class="form-text text-muted">Please don't forget it... Please don't forget it...</small>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button type="submit" class="btn btn-primary">
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
  export default {
    name: 'Login'
  }
</script>