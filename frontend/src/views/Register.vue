<script>
import { RouterLink } from 'vue-router';
import { toast } from "vue3-toastify";
export default {
    data() {
        return {
            name: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            image: '',
            errorName: '',
            errorLastname: '',
            errorEmail: '',
            errorPassword: '',
            errorConfirmPassword: '',
            errorImage: '',
        }
    },
    methods: {
        async register() {
            this.errorName = !this.name ? 'Name required' : '';
            this.errorLastname = !this.lastname ? 'Lastname required' : '';
            this.errorEmail = !this.email ? 'Email required' : '';
            //inserire validazione email
            this.errorPassword = !this.password ? 'Password required' : '';
            this.errorConfirmPassword = !this.confirmPassword ? 'Confirm Password required' : '';
            this.password = this.password.length < 5 ? 'Password must be at least 5 characters long' : '';
            this.confirmPassword = this.password != this.confirmPassword ? 'Password & confirm password doesn\'t match' : '';
            this.errorImage = !this.image ? 'Image required' : '';

            if(!this.errorName && !this.errorLastname && !this.errorEmail && !this.errorPassword && !this.errorConfirmPassword && !this.errorImage) {
                try {
                    const response = await axios.post('/api/auth/register', {
                        name: this.name,
                        lastname: this.lastname,
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.confirmPassword,
                        image: this.image
                    });
                } catch(error) {
                    toast.error('Something went wrong: ' + error.message);
                }
            }
        }
    }
}
</script>


<template>
  <div class="d-flex justify-content-center align-items-center mt-2">
    <form class="register" @submit.prevent="register">
      <input
        type="text"
        id="name"
        class="form-control form-control-sm"
        placeholder="Name"
        v-model="name"
      />
      <small class="text-primary">{{ errorName }} <i class="bi bi-bug-fill"></i></small>
      <input
        type="text"
        id="lastname"
        class="form-control form-control-sm"
        placeholder="Lastname"
        v-model="lastname"
      />
      <small class="text-primary">{{ errorLastname }} <i class="bi bi-bug-fill"></i></small>
      <input
        type="email"
        id="email"
        class="form-control form-control-sm"
        placeholder="name@example.com"
        v-model="email"
      />
      <small class="text-primary">{{ errorEmail }} <i class="bi bi-bug-fill"></i></small>
      <input
        type="password"
        id="password"
        class="form-control form-control-sm"
        placeholder="Password"
        v-model="password"
      />
      <small class="text-primary">{{ errorPassword }} <i class="bi bi-bug-fill"></i></small>
      <input
        type="password"
        id="password"
        class="form-control form-control-sm"
        placeholder="Confirm Password"
        v-model="confirmPassword"
      />
      <small class="text-primary">{{ errorConfirmPassword }} <i class="bi bi-bug-fill"></i></small>
      <input type="file" id="image" class="form-control form-control-sm"/>
      <small class="text-primary">{{ erroFile }} <i class="bi bi-bug-fill"></i></small>
      <button class="btn btn-sm btn-outline-success rounded-circle" @click="register">
        <span class="material-symbols-outlined"> how_to_reg </span>
      </button>
      <div class="d-flex justify-content-center align-items-center gap-2">
        <div class="line"></div>
        <p class="text-black-50 m-0">OR</p>
        <div class="line"></div>
      </div>
      <RouterLink class="btn btn-sm btn-success" to="/login">Sign In <i class="bi bi-airplane-engines-fill"></i></RouterLink>
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