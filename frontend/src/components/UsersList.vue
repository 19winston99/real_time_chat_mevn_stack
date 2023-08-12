<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import SearchBar from "./SearchBar.vue";
export default {
  components: {
    SearchBar,
  },
  emits: ["userSelected"],
  props: ["usersBlocked"],
  data() {
    return {
      authUser: null,
      users: [],
      searchingUser: [],
      loading: true,
    };
  },
  methods: {
    async getUsers() {
      this.loading = true;
      try {
        const response = await axios.get("/api/users/");
        if (response.data.status == "ok") {
          this.users = response.data.users;
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
    selectUser(user) {
      this.$emit("userSelected", user);
    },
    searchUser(text) {
      this.searchingUser = this.users.filter((user) =>
        user.name.toLowerCase().startsWith(text.toLowerCase())
      );
    },
    isUserBlocked(user) {
      return this.usersBlocked.some(
        (blockedUser) => blockedUser.blocked_user_id._id === user._id
      );
    },
  },
  async mounted() {
    this.authUser = JSON.parse(sessionStorage.getItem("user")) || null;
    await this.getUsers();
  },
};
</script>

<template>
  <div>
    <SearchBar @search-user="searchUser"></SearchBar>
    <div v-if="loading" class="card m-1" aria-hidden="true">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
        </p>
      </div>
    </div>
    <div v-else class="users-list-container">
      <div
        v-for="user in searchingUser.length ? searchingUser : users"
        :key="user._id"
        class="user-container"
        @click="selectUser(user)"
        :class="{
          'd-none': user.email == authUser.email,
          'blocked-user': isUserBlocked(user),
        }"
      >
        <img
          :src="'images/users/' + user.image"
          class="user-image"
          alt="user-image"
        />
        <p class="m-0 text-center">{{ user.name }} {{ user.lastname }}</p>
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
  overflow-y: hidden;
  border-radius: 10px;
  width: 16em;
}

.users-list-container::-webkit-scrollbar {
  height: 12px;
}

.users-list-container::-webkit-scrollbar-track {
  background: #ccc;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.users-list-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #252cc525;
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
  background-color: #252cc525;
  scale: 1.1;
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