<template>
  <nav>
    <v-card>
        <v-app-bar :elevation="2" color="indigo lighten-2">  
  
          <v-app-bar-title>Tienda FullStack</v-app-bar-title>
  
  
          <v-card-text max-width="40rem" class="mx-auto" color="surface-light"
          >
            <v-text-field 
            :loading="loading"
            append-inner-icon="mdi-magnify"
            density = "compact"
            label="Search"
            variant="solo"
            hide-details
            single-line
            @click:append-inner="onClick">
            </v-text-field>
          </v-card-text>

          <template v-slot:append>
            <v-btn icon ="mdi-cart"></v-btn>
          </template>
        </v-app-bar>
  
        <v-navigation-drawer
          v-model="drawer"
          :rail="rail"
          permanent
          @click="rail = false"
          color="indigo darken-1"
        >
          <v-list-item>
            <v-btn prepend-icon="mdi mdi-login" class="bg-red-darken-1 ma-1" width="7rem" v-bind:to="{name: 'login'}">
              LogIn
            </v-btn>
            <v-btn prepend-icon="mdi mdi-login" class="bg-red-darken-1 ma-1" width="7rem"  v-bind:to="{name: 'signup'}">
              SignUp
            </v-btn>
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
  
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home" v-bind:to= "{name:'home'}" ></v-list-item>
          <!-- <v-list-item prepend-icon="mdi-account" title="My Account" value="account" v-bind:to="{name:'user'}"></v-list-item> -->
            <v-list-item prepend-icon="mdi-cart" title="Shopping" value="Shopping" ></v-list-item>
            <v-list-item prepend-icon="mdi-information" title="About Us" value="About Us" v-bind:to="{name:'about'}"></v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-card>
  </nav>
  </template>
  
  <script>

  export default {
    name:'NavBar',
    
      data: () => ({
        loaded: false,
        loading: false,
        drawer: true,
          rail: true,
      }),
      methods: {
        onClick () {
          this.loading = true
  
          setTimeout(() => {
            this.loading = false
            this.loaded = true
          }, 2000)
        },
      },
    }
  
  </script>
  
  