<template>
  <div>
    Group chat page w/ {{ $route.params.groupId }}
    <!-- Chat content here -->
    <!--
      TODO:
      1. Make a template of the personal group chat room. Use Facebook Messenger as a reference
    -->
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