<template>
  <div class="row justify-content-center">
    <div class="modal fade" id="reauthenticationModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            Please re-input your current credential before continuing. Your account will be signed out, then please sign back in using your new credential.
          </div>
          <div class="modal-body">
            <form @submit="$event.preventDefault()">
              <div class="form-group">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" id="email" class="form-control" placeholder="johndoe@example.com">
                <small class="form-text text-muted">Your current email that being used.</small>
              </div>
              <button @click="changePassword" class="btn btn-success">
                Confirm credential
              </button>
              <button class="btn btn-outline-danger ml-0 ml-lg-3" data-dismiss="modal">
                Cancel my request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
              Change Password
            </span>
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="oldPassword">Old password</label>
              <input v-model="user.oldPassword" type="password" id="oldPassword" class="form-control" placeholder="********">
              <small class="form-text text-muted">Your old password, ready to say goodbye?</small>
            </div>
            <div class="form-group">
              <label for="newPassword">New password</label>
              <input v-model="user.newPassword" type="password" id="newPassword" class="form-control" placeholder="********">
              <small class="form-text text-muted">Your new password. Say hello!</small>
            </div>
            <div class="form-group">
              <label for="confirmNewPassword">Confirm new password</label>
              <input v-model="user.confirmNewPassword" type="password" id="confirmNewPassword" class="form-control" placeholder="********">
              <small class="form-text text-muted">Confirm your new password. Just to make sure it is not wrong.</small>
            </div>
            <button @click="openModal()" class="btn btn-success">
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
  import $ from 'jquery';
  import firebase from 'firebase';

  export default {
    name: 'ChangeEmail',

    data() {
      return {
        user: {
          email: '',
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
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
      openModal() {
        if((this.user.oldPassword != '')) {
          if(this.user.newPassword === this.user.confirmNewPassword) {
            $('#reauthenticationModal').modal('show');
          } else {
            alert('Your password confirmation did not match! Come back when you did');
          }
        } else {
          alert('Please fill all the fields or I won\'t confirm!');
        }
      },
      
      changePassword() {
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
          this.user.email,
          this.user.oldPassword
        );

        user.reauthenticateWithCredential(credential).then(() => {
          var auth = firebase.auth();
          
          auth.currentUser.updatePassword(this.user.newPassword).then(() => {
            $('#reauthenticationModal').modal('hide');
            auth.signOut();
          }).catch((err) => {
            var errCode = err.code;
            var errMsg = err.message;

            switch (errCode) {
              case 'auth/invalid-email':
                alert('Your old email is not valid');
                break;
            
              case 'auth/wrong-password':
                alert('Your password is not valid');
                break;

              default:
                alert(errMsg);
                break;
            }
          });

        }).catch((err) => {
          alert(err);
        });
      }
    }
  }
</script> 