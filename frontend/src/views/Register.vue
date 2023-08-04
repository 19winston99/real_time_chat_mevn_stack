<script>
import { toast } from "vue3-toastify";
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      errorName: "",
      errorLastname: "",
      errorEmail: "",
      errorPassword: "",
      errorConfirmPassword: "",
      errorImage: "",
      animate: false,
    };
  },
  methods: {
    async register() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.errorName = !this.name ? "Name required" : "";
      this.errorLastname = !this.lastname ? "Lastname required" : "";
      this.errorEmail = !this.email ? "Email required" : "";
      this.errorEmail = !emailRegex.test(this.email) ? "Invalid email" : "";
      this.errorPassword = !this.password ? "Password required" : "";
      this.errorConfirmPassword = !this.confirmPassword
        ? "Confirm Password required"
        : "";
      this.errorPassword =
        this.password.length < 5
          ? "Password must be at least 5 characters long"
          : "";
      this.errorConfirmPassword =
        this.password != this.confirmPassword
          ? "Password & confirm password doesn't match"
          : "";
      this.errorImage = !this.image ? "Image required" : "";
      if (
        !this.errorName &&
        !this.errorLastname &&
        !this.errorEmail &&
        !this.errorPassword &&
        !this.errorConfirmPassword &&
        !this.errorImage
      ) {
        this.animate = true;
        try {
          const response = await axios.post("/api/auth/register", {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
          });
          if (response.data.status == "ok") {
            this.animate = false;
            this.$refs.inputFile.value = null;
            this.name = "";
            this.lastname = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
            this.image = "";
            this.$router.push("/login");
          }
        } catch (error) {
          toast.error("Something went wrong", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
          console.log(error);
          this.animate = false;
        }
      }
    },
    onFileSelected(event) {
      this.image = event.target.files[0];
      console.log(this.image);
    },
  },
};
</script>


<template>
  <div class="d-flex justify-content-center align-items-center mt-2">
    <form class="register" @submit.prevent="register">
      <input
        type="text"
        id="name"
        name="name"
        class="form-control form-control-sm"
        placeholder="Name"
        v-model="name"
        aria-describedby="errorName"
        :class="{ 'is-invalid': errorName, 'is-valid': name != '' }"
        autocomplete="given-name"
      />
      <small class="invalid-feedback" id="errorName">{{ errorName }}</small>
      <input
        type="text"
        id="lastname"
        name="lastname"
        class="form-control form-control-sm"
        placeholder="Lastname"
        v-model="lastname"
        aria-describedby="errorLastname"
        :class="{ 'is-invalid': errorLastname, 'is-valid': lastname != '' }"
        autocomplete="family-name"
      />
      <small class="invalid-feedback" id="errorLastname">{{
        errorLastname
      }}</small>
      <input
        type="email"
        id="email"
        name="email"
        class="form-control form-control-sm"
        placeholder="email@example.com"
        v-model="email"
        :class="{ 'is-invalid': errorEmail, 'is-valid': email != '' }"
        aria-describedby="errorEmail"
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
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        class="form-control form-control-sm"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        :class="{
          'is-invalid': errorConfirmPassword,
          'is-valid':
            confirmPassword != '' &&
            confirmPassword.length > 5 &&
            confirmPassword == password,
        }"
        aria-describedby="errorConfirmPassword"
        autocomplete="current-password"
      />
      <small class="invalid-feedback" id="errorConfirmPassword">{{
        errorConfirmPassword
      }}</small>
      <input
        type="file"
        id="image"
        name="image"
        class="form-control form-control-sm"
        :class="{ 'is-invalid': errorImage }"
        aria-describedby="errorImage"
        @change="onFileSelected"
        ref="inputFile"
      />
      <small class="invalid-feedback" id="errorImage">{{ errorImage }}</small>
      <button
        type="submit"
        class="btn btn-sm btn-outline-primary rounded-circle"
        :class="{ 'animate__animated animate__rubberBand': animate }"
      >
        <i class="bi bi-person-add"></i>
      </button>
      <div class="d-flex justify-content-center align-items-center gap-2">
        <div class="line"></div>
        <p class="text-black-50 m-0">OR</p>
        <div class="line"></div>
      </div>
      <RouterLink class="btn btn-sm btn-primary" to="/login"
        >Sign In</RouterLink
      >
    </form>
  </div>
</template>

<style>
.register {
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