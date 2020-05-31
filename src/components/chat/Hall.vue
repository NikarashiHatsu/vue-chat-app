<template>
  <div class="container">
    Hall page
    <!-- Hall content here -->
    <!--
      TODO:
      1. Make a template of the chat hall. Use WhatsApp starting-up web as a reference (the page that shows up after you logged in and have not open any chat). This consists:
        a. Friend list
    -->
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