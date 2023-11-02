<script>

export default {
  name: 'Header'
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-2 py-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="item in $router.options.routes">
            <router-link class="nav-link active" v-if="item.meta.showMenu" :to="item.path" :class="(item.name == $route.name) ? 'attivo' : ''">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.attivo{
    color: blue!important;
}
</style>
