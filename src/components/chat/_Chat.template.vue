<div class="list-group">
  <div v-for="(message, index) in (conversation.chats)" :key="index" class="list-group-item">
    <span class="d-block font-weight-bold small text-uppercase">
      {{ message.sender }}
    </span>
    <span class="d-block">
      {{ message.text }}
    </span>
  </div>
</div>