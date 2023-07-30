<script>
export default {
  props: ["messages"],
};
</script>

<template>
  <div class="display-message">
    <p v-for="message in messages" :key="message._id">{{ message.text }}</p>
  </div>
</template>

<style>
.display-message {
  border: 1px solid black;
  width: 70%;
  margin: 0 auto;
  height: 85%;
  overflow-y: scroll;
}
</style>