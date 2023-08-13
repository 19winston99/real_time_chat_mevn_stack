<script>
import axios from "axios";
import { toast } from "vue3-toastify";
export default {
  props: ["currentUserSelected"],
  emits: ["messageSent"],
  data() {
    return {
      authUser: null,
      text: "",
      image: null,
      emoticons: [
        "❤",
        "😀",
        "😁",
        "😂",
        "🤣",
        "😃",
        "😄",
        "😅",
        "😆",
        "😉",
        "😊",
        "😋",
        "😎",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "🙂",
        "🤗",
        "🤩",
        "🤔",
        "🤨",
        "😐",
        "😑",
        "😶",
        "🙄",
        "😏",
        "😣",
        "😥",
        "😮",
        "🤐",
        "😯",
        "😪",
        "😫",
        "😴",
        "😌",
        "😛",
        "😜",
        "😝",
        "🤤",
        "😒",
        "😓",
        "😔",
        "😕",
        "🙃",
        "🤑",
        "😲",
        "☹",
        "🙁",
        "😖",
        "😞",
        "😟",
        "😤",
        "😢",
        "😭",
        "😦",
        "😧",
        "😨",
        "😩",
        "🤯",
        "😬",
        "😰",
        "😱",
        "😳",
        "🤪",
        "😵",
        "😡",
        "😠",
        "🤬",
        "😷",
        "🤒",
        "🤕",
        "🤢",
        "🤮",
        "🤧",
        "😇",
        "🤠",
        "🤡",
        "🤥",
        "🤫",
        "🤭",
        "🧐",
        "🤓",
        "😈",
        "👿",
        "👹",
        "👺",
        "💀",
        "👻",
        "👽",
        "🤖",
        "💩",
      ],
    };
  },
  methods: {
    async sendMessage() {
      const loadingToast = toast.loading('Sending message...', {
        pauseOnHover: false,
        theme: 'dark',
        transition: 'flip'
      });
      if (
        !this.currentUserSelected ||
        !this.authUser ||
        (!this.text && !this.image)
      )
        return;
      try {
        const formData = new FormData();
        formData.append("sender_id", this.authUser.id);
        formData.append("recipient_id", this.currentUserSelected._id);
        if (this.text) {
          formData.append("text", this.text);
        }
        if (this.image) {
          formData.append("image", this.image);
        }
        const response = await axios.post("/api/messages/", formData);
        if (response.data.status == "ok") {
          toast.remove(loadingToast);
          this.text = "";
          this.image = null;
          this.$refs.inputFile.value = null;
          toast.success("Message sent", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
          this.$emit("messageSent", response.data.message);
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
    insertEmoticon(emoticon, event) {
      this.text += emoticon;
      event.stopPropagation();
    },
    onFileSelected(event) {
      this.image = event.target.files[0];
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
    <div class="btn-group dropup">
      <button
        class="btn btn-sm btn-dark rounded-2 btn-sm dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-emoji-smile-fill"></i>
      </button>
      <ul class="dropdown-menu drop-menu">
        <li
          v-for="emoticon in emoticons"
          class="dropdown-item drop-item"
          @click="insertEmoticon(emoticon, $event)"
          :key="emoticon.key"
        >
          {{ emoticon }}
        </li>
      </ul>
    </div>
    <input
      type="text"
      class="form-control"
      v-model="text"
      placeholder="Type here a message"
      @keydown.enter="sendMessage"
    />
    <input
      type="file"
      @change="onFileSelected"
      class="form-control form-control-sm d-none"
      ref="inputFile"
      @keydown.enter="sendMessage"
    />
    <button
      :class="
        image != null ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-dark'
      "
      class="rounded-circle"
      @click="$refs.inputFile.click()"
    >
      <i class="bi bi-images"></i>
    </button>
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

.drop-menu {
  height: 10em;
  overflow-y: scroll;
}

.drop-menu::-webkit-scrollbar {
  width: 12px;
}

.dropdown-item:hover {
  cursor: pointer;
}

.drop-item {
  outline: none;
  user-select: none;
}

.drop-menu::-webkit-scrollbar-track {
  background: #ccc;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.drop-menu::-webkit-scrollbar-thumb {
  background: #252cc525;
  border-radius: 10px;
}
</style>