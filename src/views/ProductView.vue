<template>
    <v-main>
      <h1 class="text-center">Detalles del Producto</h1>
      <v-container v-if="product">
        <v-card class="mx-auto" width="50rem" height="20rem">
          <v-layout row>
            <div class="d-flex flex-row align-center justify-space-between" style="width: 100%;">
              <div>
                <v-card-title class="text-h5">{{ product.product_name }}</v-card-title>
                <v-card-subtitle>${{ product.price }}.00</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ms-2" size="small" text="Add to cart" variant="outlined"></v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" rounded="0" size="300">
                <v-img src="../assets/imgs/Slide1.png" style="border-radius: .5rem;" cover></v-img>
              </v-avatar>
            </div>
          </v-layout>
        </v-card>
      </v-container>
    </v-main>
  </template>
    
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: null,
        error: null
      };
    },
    async created() {
      const productId = this.$route.params.id;
      try {
        const response = await axios.get(`/products/product/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
        this.error = 'No se encontraron detalles del producto.';
      }
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    display: flex;
    align-items: center;
  }
  </style>
  