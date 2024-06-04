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
      
      <v-main style="height: 250px">
        <v-carousel show-arrows ="hover" height="15rem">
          <v-carousel-item src="../assets/imgs/Slide1.png" cover></v-carousel-item>
          <v-carousel-item src="../assets/imgs/Slide2.png" cover></v-carousel-item>
          <v-carousel-item src="../assets/imgs/Slide3.png" cover></v-carousel-item>
        </v-carousel>

        <v-container class="mb-6">
          <v-row align-center style="height: 15rem;" no-gutters>
          <v-col v-for="n in 3" :key="n">
            <v-sheet class="pa-2 ma-2 bg-grey-lighten-2 rounded">
              <v-img cover src="../assets/imgs/Slide1.png"></v-img>
              <p class="text-center">primero</p>
            </v-sheet>
          </v-col>
        </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-card>
</template>

<script>

export default {
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

