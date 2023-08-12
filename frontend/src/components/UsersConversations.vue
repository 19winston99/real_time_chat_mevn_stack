<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  emits: ["userSelected", 'getUsersBlocked'],
  inject: ['eventBus'],
  data() {
    return {
      conversations: [],
      user: null,
      usersBlocked: [],
    };
  },
  created() {
    this.eventBus.on('userUnlocked', (param) => {
      this.getUsersBlocked();
    })
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
    isUserBlocked(user) {
      return this.usersBlocked.some(
        (blockedUser) => blockedUser.blocked_user_id._id === user._id
      );
    },
    async getUsersBlocked() {
      try {
        const response = await axios.get("/api/usersBlocked/" + this.user.id);
        if (response.data.status == "ok") {
          this.usersBlocked = response.data.usersBlocked;
          this.$emit('getUsersBlocked', response.data.usersBlocked);
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
          this.getUsersBlocked();
          this.eventBus.emit('userBlocked', blockUser);
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
    await this.getUsersBlocked();
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
        class="user-conversation d-flex align-items-center gap-2"
        @click="selectUser(conversation.recipient_id)"
        :class="{ 'blocked-user': isUserBlocked(conversation.recipient_id) }"
      >
      <img :src="'images/users/' + conversation.recipient_id.image" class="user-image" alt="user-image">
        <p class="m-0">
          {{ conversation.recipient_id.name }}
          {{ conversation.recipient_id.lastname }}
        </p>
      </div>
      <button
        v-if="!isUserBlocked(conversation.recipient_id)"
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

.blocked-user {
  opacity: 0.5; /* Riduci l'opacità per indicare che l'utente è bloccato */
  pointer-events: none; /* Impedisce interazioni con utenti bloccati */
}

.user-image {
  width: 3em;
  height: 3em;
  border-radius: 100%;
  object-fit: cover;
}
</style>