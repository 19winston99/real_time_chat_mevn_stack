<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  props: ["currentUserSelected"],
  data() {
    return {
      authUser: null,
      text: "",
    };
  },
  methods: {
    async sendMessage() {
      if (!this.text || !this.currentUserSelected || !this.authUser) return;
      try {
        const response = await axios.post("/api/messages/", {
          sender_id: this.authUser.id,
          recipient_id: this.currentUserSelected._id,
          text: this.text,
        });
        if (response.data.status == "ok") {
          this.text = "";
          toast.success("Message sent", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
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
  mounted() {
    this.authUser = JSON.parse(sessionStorage.getItem("user")) || null;
  },
};
</script>

<template>
  <div
    class="d-flex justify-content-center align-items-center gap-1 send-message-container"
  >
    <input
      type="text"
      class="form-control"
      v-model="text"
      placeholder="Type here a message"
      @keydown.enter="sendMessage"
    />
    <button @click="sendMessage" class="btn btn-sm btn-dark rounded-circle">
      <i class="bi bi-send-fill"></i>
    </button>
  </div>
</template>

<style>
.send-message-container {
  width: 25em;
  margin: 0 auto;
}
</style>