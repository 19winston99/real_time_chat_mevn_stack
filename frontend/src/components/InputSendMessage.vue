<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  props: ["currentUserSelected", "authUser"],
  data() {
    return {
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
          this.text = '';
          toast.success('Message sent')
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
  <div
    class="d-flex justify-content-center align-items-center gap-1 send-message-container"
  >
    <input
      type="text"
      class="form-control"
      v-model="text"
      placeholder="Type here a message"
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