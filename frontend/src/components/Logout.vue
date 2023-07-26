<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  emits: ["lougout"],
  methods: {
    async logout() {
      try {
        const response = axios.get("/api/auth/logout");
        if (response) {
          sessionStorage.clear();
          this.$emit("logout");
          this.$router.push("/login");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  },
};
</script>

<template>
  <li><button class="dropdown-item" @click="logout">Logout</button></li>
</template>