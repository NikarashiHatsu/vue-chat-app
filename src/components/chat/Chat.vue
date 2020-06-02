<template>
  <div class="container">
    Chat page w/ {{ conversation.receiver }}
    <!-- Chat content here -->
    <!--
      TODO:
      1. Make a template of the personal chat room. Use Facebook Messenger as a reference
    -->
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'Chat',
    data() {
      return {
        conversation: {
          receiver: '',
          chats: [],
          text: ''
        }
      }
    },
    
    // TODO: MAKE AUTHENTICATED USER VARIABLE VALUE AS FIREBASE AUTHENTICATED USER
    mounted() {
      firebase.database().ref('chatroom/' + this.$route.params.chatId).on('value', (snapshot) => {
        var authenticatedUser = '';
        var data = snapshot.val();

        if(data.sender === authenticatedUser) {
          this.conversation.chats = data.messages.filter((e) => {
            return e;
          });
          this.conversation.receiver = data.receiver;
        }
      });
    },
  }
</script>