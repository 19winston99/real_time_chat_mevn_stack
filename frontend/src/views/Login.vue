<script>
import { toast } from "vue3-toastify";
import axios from "axios";
export default {
  inject: ['eventBus'],
  data() {
    return {
      email: "",
      password: "",
      errorEmail: "",
      errorPassword: "",
      animate: false,
      currentUser: null,
    };
  },
  methods: {
    async login() {
      this.errorEmail = !this.email ? "Email required" : "";
      this.errorPassword = !this.password ? "Password required" : "";

      if (!this.errorEmail && !this.errorPassword) {
        this.animate = true;
        try {
          const response = await axios.post("/api/auth/login", {
            email: this.email,
            password: this.password,
          });

          if (response.data.status == "ok") {
            this.animate = false;
            this.email = "";
            this.password = "";
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            this.eventBus.emit('emitNewUser', response.data.user);
            this.$router.push("/");
          }
        } catch (error) {
          this.animate = false;
          console.log(error);
          toast.error("Something went wrong", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
        }
      }
    },
  },
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center mt-2">
    <form class="login" @submit.prevent="login">
      <input
        type="email"
        id="email"
        name="email"
        class="form-control form-control-sm"
        placeholder="Email"
        v-model="email"
        aria-describedby="errorEmail"
        :class="{ 'is-invalid': errorEmail, 'is-valid': email != '' }"
        autocomplete="email"
      />
      <small class="invalid-feedback" id="errorEmail">{{ errorEmail }}</small>
      <input
        type="password"
        id="password"
        name="password"
        class="form-control form-control-sm"
        placeholder="Password"
        v-model="password"
        :class="{
          'is-invalid': errorPassword,
          'is-valid': password != '' && password.length > 5,
        }"
        aria-describedby="errorPassword"
        autocomplete="new-password"
      />
      <small class="invalid-feedback" id="errorPassword">{{
        errorPassword
      }}</small>
      <button
        type="submit"
        class="btn btn-sm btn-outline-primary rounded-circle"
        :class="{ 'animate__animated animate__rubberBand': animate }"
      >
        <i class="bi bi-door-open-fill"></i>
      </button>
      <div class="d-flex justify-content-center align-items-center gap-2">
        <div class="line"></div>
        <p class="text-black-50 m-0">OR</p>
        <div class="line"></div>
      </div>
      <RouterLink class="btn btn-sm btn-primary" to="/register"
        >Sign Up
      </RouterLink>
    </form>
  </div>
</template>

<style>
.login {
  width: 23em;
  border: 1px solid #ccc;
  border-radius: 13px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
}

.line {
  border: 1px solid #ccc;
  width: 8em;
}
</style>