<template>
  <v-main style="height: 250px">
    <v-carousel show-arrows="hover" height="15rem">
      <v-carousel-item src="../assets/imgs/Slide1.png" cover></v-carousel-item>
      <v-carousel-item src="../assets/imgs/Slide2.png" cover></v-carousel-item>
      <v-carousel-item src="../assets/imgs/Slide3.png" cover></v-carousel-item>
    </v-carousel>

    <v-container class="mb-6">
      <v-row align-center style="height: 15rem;" no-gutters>
        <v-col v-for="(product, index) in products" :key="index">
          <router-link :to="{ name: 'product', params: { id: product.product_id } }" style="text-decoration: none;">
            <v-sheet class="pa-2 ma-2 bg-grey-lighten-2 rounded">
              <v-img :src="product.src" cover></v-img>
              <p class="text-center">{{ product.product_name }}</p>
            </v-sheet>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Grid_home',

  data() {
    return {
      products: [],
    };
  },

  async created() {
    try {
      const result = await axios.get('/products/product/');
      this.products = result.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script>
