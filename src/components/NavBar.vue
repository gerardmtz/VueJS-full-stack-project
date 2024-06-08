<template>
  <nav>
    <v-card>
      <v-app-bar :elevation="2" color="indigo lighten-2">

        <v-app-bar-title>Tienda FullStack</v-app-bar-title>

        <template v-if="!isAuthenticated">
          <v-btn prepend-icon="mdi mdi-login" class="bg-red-darken-1 ma-1" width="7rem" v-bind:to="{ name: 'login' }">
            LogIn
          </v-btn>
          <v-btn prepend-icon="mdi mdi-login" class="bg-red-darken-1 ma-1" width="7rem" v-bind:to="{ name: 'signup' }">
            SignUp
          </v-btn>
        </template>
        <template v-if="isAuthenticated">
          <v-btn @click="logout" class="bg-red-darken-1 ma-1">Logout</v-btn>
        </template>

        <v-card-text max-width="40rem" class="mx-auto" color="surface-light">
          <v-text-field :loading="loading" append-inner-icon="mdi-magnify" density="compact" label="Search"
            variant="solo" hide-details single-line @click:append-inner="onClick">
          </v-text-field>
        </v-card-text>

        <template v-slot:append>
          <v-btn icon="mdi-cart"></v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false" color="indigo darken-1">
        <v-list-item>
          <!-- Mostrar nombre de usuario si está autenticado -->
          <template v-if="isAuthenticated">
            <v-list-item> <v-list-item-title>Welcome, {{ user.user.username }}</v-list-item-title></v-list-item>
          </template>
          <!-- Mostrar botones de login y signup si no está autenticado -->
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="rail = !rail"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" v-bind:to="{ name: 'home' }"></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-account" title="My Account" value="account" v-bind:to="{name:'user'}"></v-list-item> -->
          <v-list-item prepend-icon="mdi-cart" title="Shopping" value="Shopping"></v-list-item>
          <v-list-item prepend-icon="mdi-information" title="About Us" value="About Us"
            v-bind:to="{ name: 'about' }"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

  </nav>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'NavBar',

  data: () => ({
    loaded: false,
    loading: false,
    drawer: true,
    rail: true,
  }),
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    logout() {
      // Llama a la acción de logout del store
      
      this.$router.push('/login');
      this.$store.dispatch('logout');
      Swal.fire({
        title: 'Logged Out',
        text: 'Hope to see you again :)',
        icon: 'success'
      })
    },
  },
}

</script>
