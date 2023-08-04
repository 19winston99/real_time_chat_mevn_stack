<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  emits: ["logout"],
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
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
      }
    },
  },
};
</script>

<template>
  <li>
    <button class="dropdown-item" @click="logout">
      Logout <i class="bi bi-door-closed-fill"></i>
    </button>
  </li>
</template>