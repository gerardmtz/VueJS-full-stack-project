<template>
  <v-card class="mx-auto" style="margin-top: 5rem;" width="40rem">
    <v-layout row align-center>
      <v-card-title>Reseñas</v-card-title>
      <v-list>
        <v-list-item v-for="review in reviews" :key="review.review_id">
          <v-list-item-content>
            <v-list-item-title>{{ review.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ review.text }}</v-list-item-subtitle>
            <star-rating :rating="review.rating" :star-size="20" :read-only="true"></star-rating>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-layout>
  </v-card>
</template>

<script>
import axios from 'axios';
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating
  },
  props: {
    productId: {
      type: Number, // Asegúrate de que este tipo es 'Number'
      required: true
    }
  },
  data() {
    return {
      reviews: [],
      averageRating: 0
    };
  },
  async created() {
    await this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await axios.get(`/reviews/review/${this.productId}`);
        this.reviews = response.data;
        this.calculateAverageRating();
      } catch (error) {
        console.error('Error al obtener las reseñas:', error);
      }
    },
    calculateAverageRating() {
      if (this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = (totalRating / this.reviews.length).toFixed(1);
      }
    }
  }
};
</script>
