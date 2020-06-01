<template>
  <!-- Chat content here -->
  <!--
    TODO:
    1. Make a form validation
    DONE:
    1. Make a template of the personal group chat room. Use Facebook Messenger as a reference
  -->
  <div class="row justify-content-center">
    <div class="col-12">
      <div class="alert alert-warning alert-dismissible fade show">
        <span>
          The UI below is just an experimental
        </span>
        <button type="button" class="close" data-dismiss="alert">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="col-12 col-lg-8 mt-3">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <router-link :to="{ name: 'Hall' }">
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <span>
            Chat page w/ <i>Hatsucorp</i> <!-- Change the user to real group ID -->
          </span>
        </div>
        <div class="card-body pb-0">
          <!-- START LOOP -->
          <div class="row">
            <div class="col">
              <div class="alert alert-danger w-75">
                <p class="uppercase font-weight-bold small my-0">
                  NikarashiHatsu
                </p>
                <hr class="my-2">
                <p class="my-0">Hello!</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="alert alert-warning w-75">
                <p class="uppercase font-weight-bold small my-0">
                  HatsuseIzuna
                </p>
                <hr class="my-2">
                <p class="my-0">Hello-hello!</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="alert alert-secondary w-75">
                <p class="uppercase font-weight-bold small my-0">
                  ShirakamiFubuki
                </p>
                <hr class="my-2">
                <p class="my-0">Hi, guys!</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex justify-content-end">
              <div class="alert alert-success w-75">
                <p class="uppercase font-weight-bold small my-0">
                  AghitsNidallah
                </p>
                <hr class="my-2">
                <p class="my-0">Woah hello all! Nice to see you here!</p>
              </div>
            </div>
          </div>
          <!-- END LOOP -->
        </div>
        <div class="card-footer">
          <form class="form justify-content-between" @submit="$event.preventDefault()">
            <div class="row">
              <div class="col pr-0">
                <input class="form-control" type="text" placeholder="Write some message here">
              </div>
              <div class="col-auto pl-0">
                <button type="submit" class="btn btn-primary ml-3">
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
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
    name: 'Group',
    data() {
      return {
        conversation: {
          groupId: '',
          chats: [],
          sender: '',
          text: ''
        }
      }
    },

    // TODO: MAKE AUTHENTICATED USER VARIABLE VALUE AS FIREBASE AUTHENTICATED USER
    mounted() {
      firebase.database().ref('chatgroup/' + this.$route.params.groupId).on('value', (snapshot) => {
        var authenticatedUser = '';
        var users = Object.entries(snapshot.val().users);
        
        users.forEach((key) => {
          if(key[1] === authenticatedUser) {
            this.conversation.groupId = snapshot.key;
            this.conversation.chats = snapshot.val().messages.filter((e) => {
              return e;
            });
          }
        });
      });
    },
  }
</script>