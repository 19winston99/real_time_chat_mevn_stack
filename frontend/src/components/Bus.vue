<script>
import { toast } from "vue3-toastify";
import axios from "axios";
export default {
  emits: ["getUsersBlocked"],
  props: ['newUserBlocked'],
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async getUsersBlocked() {
      try {
        const response = await axios.get("/api/usersBlocked/" + this.user.id);
        if (response.data.status == "ok") {
          this.$emit("getUsersBlocked", response.data.usersBlocked);
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
  watch: {
    newUserBlocked: {
        async handler(newValue, oldValue) {
            if(newValue != oldValue)  {
                await this.getUsersBlocked()
            }
        }
    }
  },
  async mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
    await this.getUsersBlocked();
  },
};
</script>
<template>
  <div></div>
</template>