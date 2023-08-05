<script>
export default {
  props: ["messages"],
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
  },
};
</script>

<template>
  <div class="display-message mt-1">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="{
        message_sent: message.sender_id == user.id,
        message_receive: message.sender_id != user.id,
        complex_message:
          message.sender_id == user.id &&
          message.text != null &&
          message.image != null,
      }"
    >
      <div v-if="message.image != null" class="d-flex align-items-center">
        <img src="" alt="image" class="image" />
      </div>
      <div v-if="message.text != null" class="d-flex align-items-center">
        <p class="mt-1 mb-1 me-0 ms-0 text-message">{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.display-message {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 70%;
  margin: 0 auto;
  height: 85%;
  overflow-y: scroll;
  padding: 2em;
}

.display-message:hover {
  cursor: default;
}

.display-message::-webkit-scrollbar {
  width: 12px;
}

.display-message::-webkit-scrollbar-track {
  background: #ccc;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.display-message::-webkit-scrollbar-thumb {
  background: #252cc525;
  border-radius: 10px;
}

.message_sent {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.message_sent :not(.image) {
  min-width: 6em;
  word-wrap: break-word;
  max-width: 20em;
  height: auto;
  border-radius: 10px;
  padding: 0.5em;
}

.message_receive :not(.image) {
  display: inline-block;
  min-width: 6em;
  word-wrap: break-word;
  max-width: 20em;
  height: auto;
  border-radius: 10px;
  padding: 0.5em;
}

.complex_message {
  display: flex;
  justify-content: end;
  align-items: end;
  flex-direction: column;
}

.image {
  width: 10em;
  margin-bottom: 0.5em;
  border-radius: 10px;
  box-shadow: 1px 1px 3px black;
}

.text-message {
  text-align: start;
  background-color: #252cc525;
}
</style>