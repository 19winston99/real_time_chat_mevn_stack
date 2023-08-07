<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
    emits: ['usersBlocked'],
  data() {
    return {
      user: null,
      usersBlocked: [],
    };
  },
  methods: {
    async getUsersBlocked() {
      try {
        const response = await axios.get("/api/usersBlocked/" + this.user.id);
        if (response.data.status == "ok") {
          this.usersBlocked = response.data.usersBlocked;
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
    emitData() {
        this.$emit('usersBlocked', this.usersBlocked);
    }
  },
  async mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
    await this.getUsersBlocked();
  },
};
</script>

<template>
  <div>
    <!-- Button trigger modal -->
    <button
    @click="emitData"
      type="button"
      class="dropdown-item"
      data-bs-toggle="modal"
      data-bs-target="#usersBlocked"
    >
      Users Blocked <i class="bi bi-person-fill-lock"></i>
    </button>

    <!-- Modal -->
    
  </div>
</template>