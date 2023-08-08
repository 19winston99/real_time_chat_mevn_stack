<script>
import UsersList from "../components/UsersList.vue";
import Chat from "../components/Chat.vue";
import Conversations from "../components/UsersConversations.vue";
export default {
  components: {
    UsersList,
    Chat,
    Conversations,
  },
  data() {
    return {
      currentUserSelected: null,
    };
  },
  methods: {
    setUserChat(user) {
      this.currentUserSelected = user;
    },
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
      <Conversations @userSelected="setUserChat"></Conversations>
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