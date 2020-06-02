<template>
  <div class="container-md">
    <div class="row">
      <!-- col 1 -->
      <div class="col-md-4"></div>
      <!-- col 2 -->
      <div class="col-md-4 form-box">
            <h4 class="card-title text-center m-0 login">Create Account</h4>
            <p class="divider-text text-center">
                <span>Get started with your free account</span>
            </p>
            <form action="" method="POST">
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">@</div>
                    </div>
                    <input class="form-control" type="email" name="email" placeholder="Email address">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">F</div>
                    </div>
                    <input class="form-control" type="text" name="nama" placeholder="Full name">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">P</div>
                    </div>
                    <input class="form-control" type="password" name="password" placeholder="Create Password">
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">P</div>
                    </div>
                    <input class="form-control" type="password" name="r_password" placeholder="Repeat password">
                  </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary login btn-block" name="register" type="submit">Create Account</button>
                </div>
                <p class="text-center">
                  Have an account? <a href="#">Log In</a> 
                </p>                                                                 
            </form>
      </div>
      <!-- col 3 -->
      <div class="col-md-3"></div>
    </div>

    <div class="row mt-3">
       <div class="col-sm-12 text-center justify-content-center">
            <p>Copyright &copy; | Kuliah Barbar</p>
        </div>
     </div>
    
  </div>
</template>

<script>
  export default {
    name: 'Register'
  }
</script>