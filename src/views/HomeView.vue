<template>
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
</template>

<script>

export default {
name: 'Grid_home',

data: () => ({
}),
}
</script>