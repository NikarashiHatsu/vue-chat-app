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
    
    mounted() {
      firebase.database().ref('chatroom').on('value', (snapshot) => {
        var filteredRooms = [];

        snapshot.forEach((data) => {
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
        });

        this.rooms = filteredRooms;
      });
    }
  }
</script>