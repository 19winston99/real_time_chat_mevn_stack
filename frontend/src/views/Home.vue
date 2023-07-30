<script>
import UsersList from "../components/UsersList.vue";
import Chat from "../components/Chat.vue";
import Conversations from '../components/UsersConversations.vue';
export default {
  components: {
    UsersList,
    Chat,
    Conversations
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
  },
  mounted() {
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        if (sessionStorage.getItem("user")) {
          this.user = JSON.parse(sessionStorage.getItem("user"));
        }
      },
      deep: true, //detect changes in nested objects within sessionStorage
    },
  },
};
</script>

<template>
  <div
    class="container mt-3 d-flex flex-column justify-content-center align-items-center"
  >
    <UsersList @userSelected="setUserChat" :authUser="user"></UsersList>
    <Conversations :authUser="user"></Conversations>
    <Chat :currentUserSelected="currentUserSelected" :authUser="user"></Chat>
  </div>
</template>