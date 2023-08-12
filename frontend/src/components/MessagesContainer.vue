<script>
export default {
  props: ["messages", 'loading'],
  emits: ["deleteMessage", 'updateMessage'],
  data() {
    return {
      user: null,
      messageText: '',
      messageId: '',
    };
  },
  methods: {
    emitDeleteMessage(id) {
      this.$emit("deleteMessage", id);
    },
    emitUpdateMessage() {
      this.$emit('updateMessage', this.messageText, this.messageId);
    },
    setValueMessage(id, text) {
      this.messageText = text;
      this.messageId = id;
    },
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
  },
};
</script>

<template>
  <div class="display-message mt-1">
     <div v-if="loading" class="card" aria-hidden="true">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-3"></span>
          <span class="placeholder col-3"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-1"></span>
        </p>
      </div>
    </div>
    <div
    v-else
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
        <button
          v-if="message.sender_id == user.id"
          class="btn btn-sm button"
          @click="emitDeleteMessage(message._id)"
        >
          <i class="bi bi-trash trash"></i>
        </button>
        <!-- Button trigger modal -->
        <button
          v-if="message.sender_id == user.id"
          type="button"
          class="btn btn-sm button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          @click="setValueMessage(message._id, message.text)"
        >
          <i class="bi bi-pencil trash"></i>
        </button>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal1"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              <i class="bi bi-chat-left-dots-fill"></i> Edit Message
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <input class="form-control form-control-sm" v-model="messageText">
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-sm btn-primary" @click="emitUpdateMessage">
              Save changes
            </button>
          </div>
        </div>
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

.button {
  border: none !important;
  min-width: 0.5em !important;
  background: transparent !important;
  box-shadow: none !important;
}

.trash:hover {
  border: 1px solid #252525;
}
</style>