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
      dynamicText: "",
      currentLetterIndex: 0,
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
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
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
  },
  mounted() {
    this.authUser = JSON.parse(sessionStorage.getItem("user")) || null;
    setInterval(this.typeIntroText, 100);
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
      <p class="m-0">{{ currentUserSelected.name }}</p>
      <p class="m-0">{{ currentUserSelected.lastname }}</p>
    </div>
    <MessagesContainer :messages="messages"></MessagesContainer>
    <SendMessage :currentUserSelected="currentUserSelected"></SendMessage>
  </div>
  <div v-else class="chat-container">
    <div
      class="img-container m-auto d-flex justify-content-center align-items-center flex-column mt-5"
    >
    <div class="text-container">
      <p class="m-0">{{ dynamicText }}</p>

    </div>
      <img
        src="../../public/images/setup/2.gif"
        alt="waiting"
        class="img-fluid"
      />
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
}

.img-container {
  width: 20em;
}

.text-container {
  height: 2em;
}
</style>