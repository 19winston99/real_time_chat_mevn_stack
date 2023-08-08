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
    async blockUser(blockUser) {
      if (!blockUser || !this.user.id) return;
      try {
        const response = await axios.post("/api/usersBlocked/", {
          blocking_user_id: this.user.id,
          blocked_user_id: blockUser._id,
        });
        if (response.data.status == "ok") {
          toast.success("User locked out successfully", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
        }
      } catch (error) {
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
        console.log(error);
      }
    },
  },
  async mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
    await this.getConversations();
  },
};
</script>

<template>
  <div class="conversation-container d-flex gap-1 flex-column">
    <div
      class="d-flex justify-content-between align-items-center gap-1"
      v-for="conversation in conversations"
      :key="conversation._id"
    >
      <div
        class="user-conversation"
        @click="selectUser(conversation.recipient_id)"
      >
        <p class="m-0">
          {{ conversation.recipient_id.name }}
          {{ conversation.recipient_id.lastname }}
        </p>
      </div>
      <button
        class="btn btn-sm btn-outline-dark rounded-circle"
        @click="blockUser(conversation.recipient_id)"
      >
        <i class="bi bi-person-fill-lock"></i>
      </button>
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