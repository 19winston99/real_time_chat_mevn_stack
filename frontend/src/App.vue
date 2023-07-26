<script>
import { RouterLink, RouterView } from "vue-router";
import Logout from "./components/Logout.vue";

export default {
  components: { Logout },
  data() {
    return {
      user: null,
    }
  },
  methods: {
    confirmLogout() {
      this.user = null;
    }
  },
  mounted() {
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
    }
  },
  watch: {
    user(newValue, oldValue) {
      if(newValue != null) {
        this.user = JSON.parse(sessionStorage.getItem("user"));
      }
    }
  }
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
            <li class="nav-item">
              <RouterLink class="nav-link active" to="/"
                ><i class="bi bi-house-door"></i
              ></RouterLink>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-gear"></i>
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><Logout @logout="confirmLogout"></Logout></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
i {
  font-size: 1.3em;
}
</style>