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