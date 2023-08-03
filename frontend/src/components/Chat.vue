<script>
import SendMessage from "./InputSendMessage.vue";
import MessagesContainer from "./MessagesContainer.vue";
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  props: ["currentUserSelected"],
  components: {
    SendMessage,
    MessagesContainer,
  },
  data() {
    return {
      authUser: null,
      messages: [],
    };
  },
  methods: {
    async getMessages() {
      try {
        const response = await axios.get(
          "/api/messages/?user_id1=" +
            this.authUser.id +
            "&user_id2=" +
            this.currentUserSelected._id
        );
        if (response.data.status == "ok") {
          this.messages = response.data.messages;
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  },
  mounted() {
    this.authUser = JSON.parse(sessionStorage.getItem('user')) || null;
  },
  watch: {
    currentUserSelected: {
      async handler(newValue, oldValue) {
        if (newValue != oldValue) {
          await this.getMessages();
        }
      },
      deep: true,
    },
  },
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
    <div
      v-else
      class="tag-user d-flex justify-content-center align-items-center gap-1 mt-1"
    ></div>
    <MessagesContainer :messages="messages"></MessagesContainer>
    <SendMessage
      :currentUserSelected="currentUserSelected"
    ></SendMessage>
  </div>
</template>

<style>
.chat-container {
  padding: 1em;
  width: 80vw;
  height: 30em;
}

.tag-current-user {
  border: 1px solid #ccc;
  width: 16em;
  margin: 0 auto;
  border-radius: 10px;
}

.tag-user {
  border: 1px solid #ccc;
  width: 16em;
  margin: 0 auto;
  border-radius: 10px;
  height: 1.5em;
}
</style>