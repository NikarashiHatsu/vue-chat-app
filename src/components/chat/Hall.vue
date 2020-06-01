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
                Friends
              </span>
            </div>
            <div class="list-group list-group-flush">
              <router-link class="list-group-item" :to="{ name: 'Chat', params: { chatId: 'chat_1' } }">
                <i class="fas fa-user"></i>
                <span class="ml-3">
                  NikarashiHatsu
                </span>
              </router-link>
              <router-link class="list-group-item" :to="{ name: 'Chat', params: { chatId: 'chat_2' } }">
                <i class="fas fa-user"></i>
                <span class="ml-3">
                  ShirakamiFubuki
                </span>
              </router-link>
              <router-link class="list-group-item" :to="{ name: 'Chat', params: { chatId: 'chat_3' } }">
                <i class="fas fa-user"></i>
                <span class="ml-3">
                  KujouKaren
                </span>
              </router-link>
              <router-link class="list-group-item" :to="{ name: 'GroupChat', params: { groupId: 'group_1' } }">
                <i class="fas fa-users"></i>
                <span class="ml-3">
                  Hatsucorp
                </span>
              </router-link>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary">
                <i class="fas fa-user"></i>
                <span class="ml-3">
                  New chat
                </span>
              </button>
              <button class="btn btn-info ml-3">
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
        rooms: []
      }
    },
    
    // TODO: MAKE AUTHENTICATED USER VARIABLE VALUE AS FIREBASE AUTHENTICATED USER
    mounted() {
      // CHATGROUP
      firebase.database().ref('chatgroup').on('value', (snapshot) => {
        var filteredGroups = [];
        var authenticatedUser = 'aghitsnidallah';

        snapshot.forEach((data) => {
          var users = Object.entries(data.val().users);
          var template = {
            group: '',
            unread: 0
          }
          
          // Decide a group name
          users.forEach((key) => {
            if(key[1] === authenticatedUser) {
              template.group = data.key;
            }
          });

          // Count unread message
          if(data.hasChild('messages')) {
            var unread = data.val().messages.filter((d) => {
              return d.read === 0;
            });

            template.unread = unread.length;
          }

          filteredGroups.push(template);
        });
      });
      
      // CHATROOM
      firebase.database().ref('chatroom').on('value', (snapshot) => {
        var filteredRooms = [];
        var authenticatedUser = '';

        snapshot.forEach((data) => {
          if(data.val().sender == authenticatedUser) {
            var template = {
              receiver: data.val().receiver,
              unread: 0
            }
  
            if(data.hasChild('messages')) {
              var unread = data.val().messages.filter((d) => {
                return d.read == 0;
              });
  
              template.unread = unread.length;
            }
  
            filteredRooms.push(template);
          }
        });

        this.rooms = filteredRooms;
      });
    }
  }
</script>