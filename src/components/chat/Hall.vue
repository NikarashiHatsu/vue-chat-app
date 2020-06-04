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
              <button class="btn btn-info" data-toggle="modal" data-target="#newGroupChatModal">
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
    <div class="modal fade" id="newGroupChatModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            New Group Chat
          </div>
          <div class="modal-body">
            <div class="form-group my-0">
              <label for="groupChatName">Group Chat Name</label>
              <input v-model="groupChat.name" type="text" id="groupChatName" class="form-control">
            </div>
          </div>
          <div class="list-group">
            <div v-for="(user, index) in userList" :key="index" class="list-group-item d-flex flex-direction-column justify-content-between">
              <div>
                <i class="fas fa-user"></i>
                <span class="ml-3">
                  {{ user.username }}
                </span>
              </div>
              <div class="custom-control custom-checkbox">
                <input v-model="groupChat.participants" type="checkbox" class="custom-control-input" :id="index" :value="user.username">
                <label class="custom-control-label" :for="index"></label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="makeGroupChat" class="btn btn-success">
              Create group chat with {{ groupChat.participants.length }} users
            </button>
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
        rooms: [],
        userList: [],
        groupChat: {
          name: '',
          participants: [],
        }
      }
    },
    
    mounted() {
      // Send to homepage if user is not logged in
      firebase.auth().onAuthStateChanged((user) => {
        if(user == null) {
          this.$router.push({ name: 'Homepage' });
        } else {
          this.user = user.displayName;

          // Chatroom
          firebase.database().ref('users').on('value', (snapshot) => {
            var tempRoom = [];

            snapshot.forEach((data) => {
              if(data.val().username != user.displayName) {
                tempRoom.push({
                  type: 'user',
                  username: data.val().username,
                });

                this.userList.push({
                  username: data.val().username,
                });
              }
            });

            // Group
            firebase.database().ref('chatgroup').on('value', (snapshot) => {
              snapshot.forEach((data) => {
                data.child('users').forEach((user) => {
                  if(user.val().name === this.user) {
                    tempRoom.push({
                      type: 'group',
                      groupName: data.key,
                    });
                  }
                });
              });
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
      },

      makeGroupChat() {
        this.groupChat.participants.forEach((d) => {
          firebase.database().ref('chatgroup/' + this.groupChat.name + '/users').push({
            name: d
          });
        });

        firebase.database().ref('chatgroup/' + this.groupChat.name + '/users').push({
          name: this.user
        });
        
        firebase.database().ref('chatgroup/' + this.groupChat.name + '/messages').push({
          date: new Date().toISOString(),
          type: 'starting',
          text: 'Group chat started on ' + new Date().toISOString(),
        });
      },
    }
  }
</script>