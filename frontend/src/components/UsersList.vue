<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import SearchBar from "./SearchBar.vue";
export default {
  components: {
    SearchBar,
  },
  emits: ["userSelected"],
  data() {
    return {
      authUser: null,
      users: [],
      searchingUser: [],
    };
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get("/api/users/");
        if (response.data.status == "ok") {
          this.users = response.data.users;
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
    selectUser(user) {
      this.$emit("userSelected", user);
    },
    searchUser(text) {
      this.searchingUser = this.users.filter((user) => user.name.toLowerCase().startsWith(text.toLowerCase()));
    }
  },
  async mounted() {
    this.authUser = JSON.parse(sessionStorage.getItem('user')) || null;
    await this.getUsers();
  },
};
</script>

<template>
  <div>
    <SearchBar @search-user="searchUser"></SearchBar>
    <div class="users-list-container">
      <div
        v-for="user in searchingUser.length ? searchingUser : users"
        :key="user._id"
        class="user-container"
        @click="selectUser(user)"
        :class="{ 'd-none': user.email == authUser.email }"
      >
        <p class="m-0">{{ user.name }}</p>
        <p class="m-0">{{ user.lastname }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.users-list-container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding: 0.5em;
  overflow-x: scroll;
  border-radius: 50px;
}

.users-list-container::-webkit-scrollbar {
  width: 12px;
}

.users-list-container::-webkit-scrollbar-track {
  background: none;
  border-radius: 10px;
}

.users-list-container::-webkit-scrollbar-thumb {
  background: none;
  border-radius: 10px;
}

.user-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-container:hover {
  cursor: pointer;
  background-color: #ccc;
  scale: 1.1;
}
</style>