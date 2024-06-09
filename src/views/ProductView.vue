<template>
  <v-main>
    <h1 class="text-center">Detalles del Producto</h1>
    <v-container v-if="product">
      <v-card class="mx-auto" width="50rem">
        <v-layout row>
          <div class="d-flex flex-row align-center justify-space-between" style="width: 100%;">
            <div>
              <v-card-title class="text-h5">{{ product.product_name }}</v-card-title>
              <v-card-subtitle>${{ product.price }}.00</v-card-subtitle>
              <div v-if="averageRating !== null" class="d-flex align-center">
                <star-rating :rating="averageRating" :star-size="20" :read-only="true"></star-rating>
                <span class="ml-2"></span>
              </div>
              <v-card-actions>
                <v-btn class="ms-2" size="small" text="Add to cart" variant="outlined"></v-btn>
              </v-card-actions>
            </div>
            <v-avatar class="ma-3" rounded="0" size="300">
              <v-img :src="`../${product.image_url}`" style="border-radius: .5rem;" cover></v-img>
            </v-avatar>
          </div>
        </v-layout>
      </v-card>
      <write-review :productId="product.product_id"></write-review>
      <show-review :productId="product.product_id"></show-review>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating';
import WriteReview from '@/components/WriteReview.vue'
import ShowReview from '@/components/ShowReview.vue'

export default {
  name: 'ProductDetail',
  components: {
    WriteReview,
    ShowReview,
    StarRating
  },
  data() {
    return {
      product: null,
      averageRating: null,
      error: null
    };
  },
  async created() {
    const productId = this.$route.params.id;
    await this.fetchProductDetails(productId);
    await this.fetchAverageRating(productId);
  },
  methods: {
    async fetchProductDetails(productId) {
      try {
        const response = await axios.get(`/products/product/${productId}`);
        this.product = response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
        this.error = 'No se encontraron detalles del producto.';
      }
    },
    async fetchAverageRating(productId) {
      try {
        const response = await axios.get(`/reviews/reviews/average/${productId}`);
        this.averageRating = response.data.averageRating;
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
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
