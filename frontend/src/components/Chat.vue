<script>
import SendMessage from "./InputSendMessage.vue";
import MessagesContainer from "./MessagesContainer.vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { io } from "socket.io-client";
export default {
  props: ["currentUserSelected"],
  inject: ["eventBus"],
  components: {
    SendMessage,
    MessagesContainer,
  },
  data() {
    return {
      authUser: null,
      messages: [],
      dynamicText: "",
      currentLetterIndex: 0,
      blockedUserId: null,
      loading: true,
      socket: io("http://localhost:3000"),
    };
  },
  methods: {
    async getMessages() {
      this.loading = true;
      try {
        const response = await axios.get(
          "/api/messages/?user_id1=" +
            this.authUser.id +
            "&user_id2=" +
            this.currentUserSelected._id
        );
        if (response.data.status == "ok") {
          this.messages = response.data.messages;
          this.loading = false;
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
      }
    },
    async deleteMessage(id) {
      if (!id) return;
      try {
        const response = await axios.delete("/api/messages/" + id);
        if (response.data.status == "ok") {
          this.messages = this.messages.filter((el) => el._id !== id);
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
      }
    },
    async updateMessage(messageText, messageId) {
      if (!messageText || !messageId) return;
      try {
        const response = await axios.patch("/api/messages/" + messageId, {
          text: messageText,
        });
        if (response.data.status == "ok") {
          const editedMessageIndex = this.messages.findIndex(
            (message) => message._id === messageId
          );
          if (editedMessageIndex !== -1) {
            // Update the text of the edited message in the messages array
            this.messages[editedMessageIndex].text = messageText;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    typeIntroText() {
      const text = ". . . Select a user to start chatting . . .";
      if (this.currentLetterIndex < text.length) {
        this.dynamicText += text[this.currentLetterIndex];
        this.currentLetterIndex++;
      } else {
        this.dynamicText = "";
        this.currentLetterIndex = 0;
      }
    },
    setNewMessage(message) {
      this.messages.push(message);
    },
  },
  mounted() {
    this.authUser = JSON.parse(sessionStorage.getItem("user")) || null;
    setInterval(this.typeIntroText, 100);
  },
  created() {
    this.eventBus.on("userBlocked", (blocked) => {
      this.blockedUserId = blocked;
    });
    this.eventBus.on("userUnlocked", (unlocked) => {
      this.blockedUserId = null;
    });

    this.socket.on("newMessage", (message) => {
      this.messages.push(message);
    });
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
  <div class="chat-container" v-if="currentUserSelected">
    <div
      class="tag-current-user d-flex justify-content-center align-items-center gap-1 mt-1"
    >
      <img
        :src="'images/users/' + currentUserSelected.image"
        alt="user-image"
        class="userSelected-image"
      />
      <p class="m-0">{{ currentUserSelected.name }}</p>
      <p class="m-0">{{ currentUserSelected.lastname }}</p>
    </div>
    <MessagesContainer
      :loading="loading"
      :messages="messages"
      @deleteMessage="deleteMessage"
      @updateMessage="updateMessage"
    ></MessagesContainer>
    <SendMessage
      v-if="
        blockedUserId == null || currentUserSelected._id !== blockedUserId._id
      "
      :currentUserSelected="currentUserSelected"
      @messageSent="setNewMessage"
    ></SendMessage>
  </div>
  <div v-else class="chat-container">
    <div
      class="img-container m-auto d-flex justify-content-center align-items-center flex-column mt-5"
    >
      <div class="text-container">
        <p class="m-0">{{ dynamicText }}</p>
      </div>
      <img src="images/setup/waiting.gif" alt="waiting" class="img-fluid" />
    </div>
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
  padding: 0.3em;
}

.img-container {
  width: 20em;
}

.text-container {
  height: 2em;
}

.userSelected-image {
  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;
  object-fit: cover;
}
</style>