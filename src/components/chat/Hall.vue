<template>
  <!-- Hall content here -->
  <!--
    TODO:
    1. Make 'add friend' feature using the user ID
    2. Make new chat dialog
    3. Make new group chat dialog
    DONE:
    1. Make a template of the chat hall. Use WhatsApp starting-up web as a reference (the page that shows up after you logged in and have not open any chat). This consists:
      a. Friend list
  -->
  <div class="row">
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
    <div class="col-12">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
          <div class="card">
            <div class="card-header">
              <i class="fas fa-users"></i>
              <span class="ml-3">
                User list
              </span>
            </div>
            <div class="list-group list-group-flush">
              <button
                v-for="(room, index) in rooms" 
                :key="index" 
                @click="startChat(room.username)"
                class="list-group-item btn btn-outline-success text-left">
                <div v-if="room.type == 'user'" >
                  <i class="fa fa-user"></i>
                  <span class="ml-3">
                    {{ room.username }}
                  </span>
                </div>
                <div v-else>
                  <i class="fa fa-users"></i>
                  <span class="ml-3">
                    {{ room.groupName }}
                  </span>
                </div>
              </button>
            </div>
            <div class="card-footer">
              <button class="btn btn-info">
                <i class="fas fa-users"></i>
                <span class="ml-3">
                  New group chat
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'Chat',
    
    data() {
      return {
        user: '',
        rooms: []
      }
    },
    
    mounted() {
      // Send to homepage if user is not logged in
      firebase.auth().onAuthStateChanged((user) => {
        if(user == null) {
          this.$router.push({ name: 'Homepage' });
        } else {
          this.user = user.displayName;

          firebase.database().ref('users').on('value', (snapshot) => {
            var tempRoom = [];

            snapshot.forEach((data) => {
              if(data.val().username != user.displayName) {
                tempRoom.push({
                  type: 'user',
                  username: data.val().username,
                }); 
              }
            });

            this.rooms = tempRoom;
          });
        }
      });
    },

    methods: {
      startChat(username) {
        var database = firebase.database();

        database.ref('chatroom/' + this.user + '-' + username).once('value').then((sn) => {

          if(sn.val() == null) {
            database.ref('chatroom/' + username + '-' + this.user).once('value').then((sn) => {
              
              if(sn.val() == null) {
                database.ref('chatroom/' + this.user + '-' + username).push({
                  date: new Date().toISOString(),
                  type: 'startdate',
                  text: 'Chat started on ' + new Date().toISOString(),
                }).then(() => {
                  this.$router.push({ name: 'Chat', params: { chatId: username }});
                })
              } else {
                this.$router.push({ name: 'Chat', params: { chatId: username }});
              }

            });
          } else {
            this.$router.push({ name: 'Chat', params: { chatId: username }});
          }
          
        });
      }
    }
  }
</script>