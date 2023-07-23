<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<div>
  <nav class="navbar navbar-expand bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand">Nome Utente + foto</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Edit Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <!-- <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
  </header> -->
  <RouterView />
</div>
</template>