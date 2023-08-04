<script>
export default {
  props: ["messages"],
};
</script>

<template>
  <div class="display-message mt-1">
    <p v-for="message in messages" :key="message._id">{{ message.text }}</p>
  </div>
</template>

<style>
.display-message {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 70%;
  margin: 0 auto;
  height: 85%;
  overflow-y: scroll;
  padding: 1em;
}

.display-message::-webkit-scrollbar {
  width: 12px;
}

.display-message::-webkit-scrollbar-track {
  background: #ccc;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.display-message::-webkit-scrollbar-thumb {
  background: #252cc525;
  border-radius: 10px;
}


.display-message p {
  cursor: default;
}
</style>