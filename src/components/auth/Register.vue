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
              <input type="email" id="email" class="form-control" placeholder="johndoe@example.com">
              <small class="form-text text-muted">You will use your email to log in</small>
            </div>
            <div class="form-group">
              <label for="username">
                Username
              </label>
              <input type="text" id="username" class="form-control" placeholder="John Doe">
              <small class="form-text text-muted">Use your desired username</small>
            </div>
            <div class="form-group">
              <label for="password">
                Password
              </label>
              <input type="password" id="password" class="form-control" placeholder="********">
              <small class="form-text text-muted">As a recommendation, please use 8 character long password</small>
            </div>
            <div class="form-group">
              <label for="confirmPassword">
                Confirm password
              </label>
              <input type="password" id="confirmPassword" class="form-control" placeholder="********">
              <small class="form-text text-muted">I'm pretty sure you still remember password you typed above</small>
            </div>
            <button type="submit" class="btn btn-primary">
              Register me in!
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register'
  }
</script>