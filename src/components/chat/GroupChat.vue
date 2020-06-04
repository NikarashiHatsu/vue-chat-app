<template>
  <div class="row justify-content-center">
    <div class="col-12 col-lg-8 mt-3">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <router-link :to="{ name: 'Hall' }">
            <i class="fas fa-arrow-left"></i>
          </router-link>
          <div>
            <span>Chat w/ </span>
            <span>{{ receiver }}</span>
          </div>
        </div>
        <div class="card-body pb-0">
          <!-- START LOOP -->
          <div v-for="(chat, index) in chats" :key="index" class="row">
            <div v-if="chat.type === 'startdate'" class="col text-center mb-3">
              {{ chat.text }}
            </div>
            <div v-else-if="chat.sender === sender" class="col d-flex flex-row-reverse">
              <div class="alert alert-success p-2 px-3 w-75">
                <div class="small text-uppercase font-weight-bold">{{ chat.sender }}</div>
                <hr class="my-2" />
                <span>
                  {{ chat.text }}
                </span>
              </div>
            </div>
            <div v-else class="col">
              <div class="alert alert-secondary p-2 px-3 w-75">
                <div class="small text-uppercase font-weight-bold">{{ chat.sender }}</div>
                <hr class="my-2" />
                <span>
                  {{ chat.text }}
                </span>
              </div>
            </div>
          </div>
          <!-- END LOOP -->
        </div>
        <div class="card-footer">
          <form class="form justify-content-between" @submit="$event.preventDefault()">
            <div class="row">
              <div class="col pr-0">
                <input v-model="text" class="form-control" type="text" placeholder="Write some message here">
              </div>
              <div class="col-auto pl-0">
                <button @click="sendMessage" type="submit" class="btn btn-primary ml-3">
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
    name: 'GroupChat',
    
    data() {
      return {
        sender: '',
        receiver: this.$route.params.groupId,
        chats: [],
        text: '',
      }
    },

    mounted() {
      firebase.auth().onAuthStateChanged((user) => {
        if(user == null) {
          this.$route.push({ name: 'Homepage' });
        } else {
          this.sender = user.displayName;

          firebase.database().ref('chatgroup/' + this.receiver + '/messages').on('value', (snapshot) => {
            var tempChats = [];

            snapshot.forEach((data) => {
              tempChats.push(data.val());
            });

            this.chats = tempChats;
          });
        }
      });
    },

    methods: {
      sendMessage() {
        var database = firebase.database();

        database.ref('chatgroup/' + this.receiver + '/messages').push({
          date: new Date().toISOString(),
          sender: this.sender,
          text: this.text,
        }).then(() => {
          this.text = '';
        });
      }
    }
  }
</script>