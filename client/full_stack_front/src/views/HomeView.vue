<template>
  <v-card>
    <v-app>
      <v-app-bar :elevation="2" color="indigo lighten-2">
        <template>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>  
        </template>

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
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
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
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-cart" title="Shopping" value="Shopping"></v-list-item>
          <v-list-item prepend-icon="mdi-information" title="About Us" value="About Us"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
      <Grid_home></Grid_home>
    </v-main>
    </v-app>
  </v-card>
</template>

<script>
import Grid_home from '@/components/Grid_home.vue';


export default {
    data: () => ({
      loaded: false,
      loading: false,
      drawer: true,
        rail: true,
    }),
    components: {
      Grid_home
    },

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

