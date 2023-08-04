<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  emits: ["userSelected"],
  data() {
    return {
      conversations: [],
      user: null,
    };
  },
  methods: {
    async getConversations() {
      try {
        const response = await axios.get(
          "/api/messages/conversations/" + this.user.id
        );
        if (response.data.status == "ok") {
          this.conversations = response.data.conversations;
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
    selectUser(user) {
      this.$emit("userSelected", user);
    },
  },
  async mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    await this.getConversations();
  },
};
</script>

<template>
  <div class="conversation-container d-flex gap-1 flex-column">
    <div
      v-for="conversation in conversations"
      :key="conversation._id"
      class="d-flex justify-content-center align-items-center gap-1 user-conversation"
      @click="selectUser(conversation.recipient_id)"
    >
      <p class="m-0">{{ conversation.recipient_id.name }}</p>
      <p class="m-0">{{ conversation.recipient_id.lastname }}</p>
    </div>
  </div>
</template>

<style>
.conversation-container {
  border: 2px solid #ccc;
  padding: 1em;
  width: 21vw;
  border-radius: 10px;
  overflow-y: scroll;
  height: 20em;
}

.conversation-container::-webkit-scrollbar {
  width: 12px;
}

.conversation-container::-webkit-scrollbar-track {
  background: #ccc;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.conversation-container::-webkit-scrollbar-thumb {
  background: #252cc525;
  border-radius: 10px;
}

.user-conversation {
  border-radius: 10px;
  padding: 0.7em;
  border: 1px solid #ccc;
}

.user-conversation:hover {
  cursor: pointer;
  background: #252cc525;
}
</style>