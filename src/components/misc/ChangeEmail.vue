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
                <label for="oldEmail">Old Email</label>
                <input v-model="user.oldEmail" type="email" id="oldEmail" class="form-control" placeholder="oldjohndoe@example.com">
                <small class="form-text text-muted">Your current email that being used</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model="user.password" type="password" id="password" class="form-control" placeholder="********">
                <small class="form-text text-muted">Your current password</small>
              </div>
              <button @click="changeEmail" class="btn btn-success">
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
              Change Email
            </span>
          </span>
        </div>
        <div class="card-body">
          <form @submit="$event.preventDefault()">
            <div class="form-group">
              <label for="newEmail">New email address</label>
              <input v-model="user.email" type="email" id="newEmail" class="form-control" placeholder="newjohndoe@example.com">
              <small class="form-text text-muted">After you clicking the green button, you will be logged out.</small>
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
          oldEmail: '',
          email: '',
          password: ''
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
        if(this.user.email != '') {
          $('#reauthenticationModal').modal('show');
        }
      },
      
      changeEmail() {
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
          this.user.oldEmail,
          this.user.password
        );
        
        user.reauthenticateWithCredential(credential).then(() => {
          var auth = firebase.auth();
          
          auth.currentUser.updateEmail(this.user.email).then(() => {
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