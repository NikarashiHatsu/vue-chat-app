<template>
  <!-- Forgot password content here -->
  <!-- 
    TODO:
    1. Make a form validation
    2. Make an alert if:
      a. Email is not registered
      b. Firebase is having a problem
    DONE:
    1. Make a forgot password form here
    2. Forgot password form consist:
      a. Email
  -->
  <div class="row justify-content-center">
    <div class="col-12 col-md-6">
      <div class="card">
        <div class="card-header">
          <i class="fas fa-question"></i>
          <span class="ml-3">
            Forgot password page
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" id="email" class="form-control" placeholder="johndoe@example.com">
              <small class="form-text text-muted">I'm sorry to hear that you forgot your password, but I'm also sad because I can't remember yours too</small>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button class="btn btn-primary" type="submit">Send my recovery link!</button>
              <small>
                Wait, now I remember! <router-link :to="{ name: 'Login' }">Bring me back!</router-link>
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
    name: 'Forgot'
  }
</script>