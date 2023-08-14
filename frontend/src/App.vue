<script>
import { RouterLink, RouterView } from "vue-router";
import Logout from "./components/Logout.vue";
import { toast } from "vue3-toastify";
import axios from "axios";
import { io } from "socket.io-client";
export default {
  components: { Logout },
  inject: ["eventBus"],
  data() {
    return {
      user: null,
      name: "",
      lastname: "",
      image: "",
      errorLastname: "",
      errorName: "",
      usersBlocked: [],
      socket: io("http://localhost:3000"),
    };
  },
  methods: {
    confirmLogout() {
      this.user = null;
      this.$router.push("/login");
    },
    async updateUser() {
      this.errorName = !this.name ? "Name required" : "";
      this.errorLastname = !this.lastname ? "Lastname required" : "";
      if (!this.errorName && !this.errorLastname) {
        try {
          const formData = new FormData();
          formData.append("name", this.name);
          formData.append("lastname", this.lastname);
          if (this.image) {
            formData.append("image", this.image);
          }
          const response = await axios.patch(
            "/api/users/" + this.user.id,
            formData
          );
          if (response.data.status == "ok") {
            this.user = response.data.user;
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            toast.info("Update complete", {
              pauseOnHover: false,
              theme: "dark",
              transition: "flip",
            });
          }
        } catch (error) {
          console.log(error);
          this.updateSuccess = false;
          toast.error("Something went wrong", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
        }
      }
    },
    async getUsersBlocked() {
      try {
        const response = await axios.get("/api/usersBlocked/" + this.user.id);
        if (response.data.status == "ok") {
          this.usersBlocked = response.data.usersBlocked;
        }
      } catch (error) {
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
        console.log(error);
      }
    },
    async unlockUser(id) {
      if (!id) return;
      try {
        const response = await axios.delete("/api/usersBlocked/" + id);
        if (response.data.status == "ok") {
          toast.success("User successfully unlocked", {
            pauseOnHover: false,
            theme: "dark",
            transition: "flip",
          });
          this.usersBlocked = this.usersBlocked.filter((el) => el._id !== id);
          this.eventBus.emit("userUnlocked", id);
        }
      } catch (error) {
        toast.error("Something went wrong", {
          pauseOnHover: false,
          theme: "dark",
          transition: "flip",
        });
        console.log(error);
      }
    },
    onFileSelected(event) {
      this.image = event.target.files[0];
    },
  },
  async mounted() {
    if (sessionStorage.getItem("user")) {
      this.user = JSON.parse(sessionStorage.getItem("user")) || null;
      this.name = this.user.name;
      this.lastname = this.user.lastname;
      await this.getUsersBlocked();
    } else {
      this.$router.push("/login");
    }
    this.socket.emit("newUser", this.user.name + " " + this.user.lastname);
  },
  created() {
    this.socket.on("newUserNotification", (user) => {
      toast.success(user + " is now online", {
        pauseOnHover: false,
        theme: "dark",
        transition: "flip",
      });
    });
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
        <img
          :src="'images/users/' + user.image"
          class="user-image me-2"
          alt="user-image"
        />
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
                    Edit Profile <i class="bi bi-pencil-square"></i>
                  </button>
                </li>
                <li>
                  <button
                    @click="getUsersBlocked"
                    type="button"
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#usersBlocked"
                  >
                    Users Blocked <i class="bi bi-person-fill-lock"></i>
                  </button>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><Logout @logout="confirmLogout"></Logout></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="container-fluid">
        <p class="navbar-brand m-0">
          <i class="bi bi-wechat icon"></i> MEVN Real Time Chat App
        </p>
      </div>
    </nav>
    <RouterView />
    <!-- Edit Modal -->
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
              Informations
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex flex-column gap-1">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control form-control-sm"
              id="name"
              :class="{ 'is-invalid': errorName, 'is-valid': name != '' }"
              v-model="name"
            />
            <label for="lastname" class="form-label">Lastname</label>
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
            <label for="image">Image Picture</label>
            <input
              type="file"
              class="form-control form-control-sm"
              @change="onFileSelected"
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
    <!-- Users Blocked Modal -->
    <div
      class="modal fade"
      id="usersBlocked"
      tabindex="-1"
      aria-labelledby="usersBlockedLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="usersBlockedLabel">
              Unlock User <i class="bi bi-unlock-fill"></i>
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div
              class="d-flex align-items-center justify-content-between mb-2"
              v-for="userBlocked in usersBlocked"
              :key="userBlocked._id"
            >
              <p class="m-0">
                {{ userBlocked.blocked_user_id.name }}
                {{ userBlocked.blocked_user_id.lastname }}
              </p>
              <button
                class="btn btn-sm rounded-circle btn-outline-primary"
                @click="unlockUser(userBlocked._id)"
              >
                <i class="bi bi-unlock-fill"></i>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-sm btn-danger"
              data-bs-dismiss="modal"
            >
              Close
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

.user-image {
  width: 3em;
  height: 3em;
  border-radius: 100%;
  object-fit: cover;
}
</style>