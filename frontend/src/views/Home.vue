<script>
import UsersList from "../components/UsersList.vue";
import Chat from "../components/Chat.vue";
import Conversations from "../components/UsersConversations.vue";
import { toast } from "vue3-toastify";
import axios from "axios";
export default {
  components: {
    UsersList,
    Chat,
    Conversations,
  },
  data() {
    return {
      currentUserSelected: null,
      user: null,
    };
  },
  methods: {
    setUserChat(user) {
      this.currentUserSelected = user;
    },
    async blockUser(id) {
      if (!id || !this.user.id) return;
      try {
        const response = await axios.post("/api/usersBlocked/", {
          blocking_user_id: this.user.id,
          blocked_user_id: id,
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
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
  },
  // watch: {
  //   $route: {
  //     handler(newValue, oldValue) {
  //       if (sessionStorage.getItem("user")) {
  //         this.user = JSON.parse(sessionStorage.getItem("user"));
  //       }
  //     },
  //     deep: true, //detect changes in nested objects within sessionStorage
  //   },
  // },
};
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div
      class="d-flex flex-column justify-content-center align-items-center users-container"
    >
      <UsersList @userSelected="setUserChat"></UsersList>
      <Conversations
        @userSelected="setUserChat"
        @emitBlockUser="blockUser"
      ></Conversations>
    </div>
    <Chat :currentUserSelected="currentUserSelected"></Chat>
  </div>
</template>

<style>
.users-container {
  padding: 0.5em;
  width: 20em;
}
</style>