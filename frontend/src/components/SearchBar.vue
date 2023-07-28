<script>
export default {
  emits: ["search-user"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    searchUser() {
      this.$emit("search-user", this.text);
    },
  },
};
</script>

<template>
  <input
    type="text"
    v-model="text"
    class="form-control form-control-sm searchbar"
    @input="searchUser"
    placeholder="Search a user..."
  />
</template>

<style>
.searchbar {
    width: 20em;
}
</style>