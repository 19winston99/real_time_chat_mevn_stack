<script>
import UsersList from "../components/UsersList.vue";

export default {
  components: {
    UsersList,
  },
  data() {
    return {
      currentUserSelected: null,
    }
  },
  methods: {
    setUserChat(user) {
      this.currentUserSelected = user;
    }
  }
};
</script>

<template>
  <div class="container mt-3">
    <UsersList @userSelected="setUserChat"></UsersList>
  </div>
</template>