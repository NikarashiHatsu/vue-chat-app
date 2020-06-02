<template>
   <div class="container-md">
     <!-- Row 1 -->
     <div class="row justify-content-center">
       <div class="col-md-4"></div>
        <!-- column untuk card -->
       <div class="col-md-4">
                      <form action="" method="POST" class="form-box">
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input class="form-control" type="email" id="email" name="email" placeholder="example@mail.com">
                        </div>
                        <div class="form-group">
                          <label for="password">Password</label>
                          <input class="form-control" type="password" id="password" name="password">
                        </div>
                        <div class="form-group">
                              <button class="login btn btn-success btn-block" style="border-radius: 10px;" type="submit" name="login"> Login </button>
                              <button class="login btn btn-primary btn-block " style="border-radius: 10px;" type="submit" name="register"> Registrasi </button>
                        </div> 
                        <p class="forgot-pass">
                          Forgot<a href="#"> Username / Password ?</a>
                        </p>       
                      </form>
       </div>
        <!-- end column -->
       <div class="col-md-4"></div>
     </div>

     <!-- Row 2 -->
     <div class="row mt-3">
       <div class="col-sm-12 text-center justify-content-center">
            <p>Copyright &copy; | Kuliah Barbar</p>
        </div>
     </div>
   </div>
</template>

<script>
  export default {
    name: 'Login'
  }
</script>