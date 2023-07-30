<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
    props: ['authUser'],
    data() {
        return {
            conversations: [],
            user: null,
        }
    },
  methods: {
    async getConversations() {
      try {
        const response = await axios.get("/api/messages/conversations/" + this.authUser.id);
        if(response.data.status == 'ok') {
            this.conversations = response.data.conversations;
            console.log('conversations ok')
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  },
  mounted() {
    console.log(sessionStorage.getItem('user'));
    // await this.getConversations();
  }
};
</script>

<template></template>