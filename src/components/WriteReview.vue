<template>
  <div v-if="isAuthenticated">
  <v-card class="mx-auto" width="40rem" height="30rem" style="margin-top: 5rem;" elevation-5>
    <v-layout row align-center>
    <v-form @submit.prevent="submitReview" class="mx-auto"  >
      <h2>Escribir Reseña</h2>
      <v-text-field v-model="review.title" label="Título" required></v-text-field>
      <v-textarea v-model="review.text" label="Texto" required></v-textarea>
      <v-rating v-model="review.rating" label="Calificación" clearable></v-rating>
      <v-btn color="primary" type="submit">Enviar Reseña</v-btn>
    </v-form>
  </v-layout>
  </v-card>
</div>
  <div v-else>
    <p>Debes iniciar sesión para escribir una reseña.</p>
    <!-- Puedes agregar aquí un botón o enlace para redirigir a la página de inicio de sesión -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';
import store from '@/store';
import Swal from 'sweetalert2';

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const review = ref({
      title: '',
      text: '',
      rating: 0,
      product_id: props.productId, 
    });

    const isAuthenticated = computed(() => {
      return store.getters.isAuthenticated;
    });

    const submitReview = async () => {
      try {
        await axios.put('/reviews/review/', review.value);
        Swal.fire({
          title: 'Product Reviewed Succesfully',
          text: 'Thanks for your feedback :)',
          icon: 'success',
        }),
        resetForm();
        location.reload();
      } catch (error) {
        console.error('Error al enviar la reseña:', error);
        alert('Error al enviar la reseña. Por favor, inténtalo de nuevo.');
      }
    };

    const resetForm = () => {
      review.value.title = '';
      review.value.text = '';
      review.value.rating = 0;
    };

    return {
      review,
      submitReview,
      isAuthenticated
    };
  }
};
</script>
