<template>
    <div>
      <h1>Detalles del Producto</h1>
      <v-container v-if="product">
        <v-row>
          <v-col cols="12">
            <v-img :src="product.src" alt="Imagen del Producto"></v-img>
          </v-col>
          <v-col cols="12">
            <h2>{{ product.product_name }}</h2>
            <p><strong>Precio:</strong> ${{ product.price }}</p>
            <p><strong>Tiene Descuento:</strong> {{ product.has_discount ? 'Sí' : 'No' }}</p>
            <p v-if="product.has_discount"><strong>Precio con Descuento:</strong> ${{ product.discount_price }}</p>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row>
          <v-col cols="12">
            <v-alert type="error" dismissible>
              No se encontraron detalles del producto.
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
  