<script>
import { RouterLink, RouterView } from "vue-router";
import Logout from "./components/Logout.vue";
import { toast } from "vue3-toastify";
import axios from "axios";
export default {
  components: { Logout },
  data() {
    return {
      user: null,
      name: "",
      lastname: "",
      errorLastname: "",
      errorName: "",
    };
  },
  methods: {
    confirmLogout() {
      this.user = null;
    },
    async updateUser() {
      this.errorName = !this.name ? "Name required" : "";
      this.errorLastname = !this.lastname ? "Lastname required" : "";
      if (!this.errorName && !this.errorLastname) {
        try {
          const response = await axios.patch("/api/users/" + this.user.id, {
            name: this.name,
            lastname: this.lastname,
          });
          if (response.data.status == "ok") {
            this.user = response.data.user;
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            toast.info("Update complete");
          }
        } catch (error) {
          console.log(error);
          this.updateSuccess = false;
          toast.error("Something went wrong");
        }
      }
    },
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user")) || null;
    this.name = this.user.name;
    this.lastname = this.user.lastname;
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        if (sessionStorage.getItem("user") && newValue != oldValue) {
          this.user = JSON.parse(sessionStorage.getItem("user"));
          this.name = this.user.name;
          this.lastname = this.user.lastname;
        }
      },
      deep: true, //detect changes in nested objects within sessionStorage
    },
  },
};
</script>

<template>
  <div>
    <nav
      class="navbar navbar-expand bg-dark border-bottom border-bottom-dark"
      data-bs-theme="dark"
    >
      <div class="container-fluid" v-if="user != null">
        <a class="navbar-brand">{{ user.name }} {{ user.lastname }}</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-gear icon"></i>
              </a>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Edit Profile
                  </button>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><Logout @logout="confirmLogout"></Logout></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView />
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Update User Info <i class="bi bi-pen"></i>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex flex-column gap-1">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control form-control-sm"
              id="name"
              :class="{ 'is-invalid': errorName, 'is-valid': name != '' }"
              v-model="name"
            />
            <label for="lastname">Lastname</label>
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="lastname"
              :class="{
                'is-invalid': errorLastname,
                'is-valid': lastname != '',
              }"
              id="lastname"
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-sm btn-success"
              @click="updateUser"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.icon {
  font-size: 1.3em;
}
</style>