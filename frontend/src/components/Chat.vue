<script>
import SendMessage from './InputSendMessage.vue';
export default {
  props: ["currentUserSelected"],
  components: {
    SendMessage,
  }
};
</script>

<template>
  <div class="chat-container">
    <div
      v-if="currentUserSelected"
      class="tag-current-user d-flex justify-content-center align-items-center gap-1 mt-1"
    >
      <p class="m-0">{{ currentUserSelected.name }}</p>
      <p class="m-0">{{ currentUserSelected.lastname }}</p>
    </div>
    <SendMessage></SendMessage>
  </div>
</template>

<style>
.chat-container {
  border: 2px solid #ccc;
  border-radius: 10px;
  width: 75vw;
  height: 20em;
  overflow-y: scroll;
}

.tag-current-user {
  border: 1px solid #ccc;
  width: 16em;
  margin: 0 auto;
  border-radius: 10px;
}
</style>