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
              <router-link v-for="(room, index) in rooms" :key="index" :to="{ name: 'Chat', params: { chatId: room.id } }" class="list-group-item btn btn-outline-success text-left">
                <i v-if="room.type == 'user'" class="fa fa-user"></i>
                <i v-else class="fa fa-users"></i>
                <span class="ml-3">
                  {{ room.username }}
                </span>
              </router-link>
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
        user: {
          username: ''
        },
        rooms: []
      }
    },
    
    mounted() {
      // Send to homepage if user is not logged in
      firebase.auth().onAuthStateChanged((user) => {
        if(user == null) {
          this.$router.push({ name: 'Homepage' });
        } else {
          // Chatroom
          firebase.database().ref('users').on('value', (snapshot) => {
            var tempRoom = [];

            snapshot.forEach((data) => {
              if(data.val().username != user.displayName) {
                tempRoom.push({
                  id: data.key,
                  type: 'user',
                  username: data.val().username,
                }); 
              }
            });

            this.rooms = tempRoom;
          });
        }
      });
    }
  }
</script>