<template>
  <v-main>
    <!-- Formulario para agregar un nuevo elemento -->
    <v-form @submit.prevent="addElement">
      <v-text-field v-model="nameProduct" label="New Product" required></v-text-field>
      <v-text-field v-model="price" label="price" required></v-text-field>
      <v-text-field v-model="hasDiscount" label="hasDiscount" required ></v-text-field>
      <v-text-field v-model="priceDiscount" label="price discounted" required></v-text-field>
      <v-btn type="submit">Add</v-btn>
    </v-form>

    <!-- Lista de elementos existentes -->
    <v-list>
      <v-list-item v-for="element in elements" :key="element.id">
        <v-list-item-content>
          <v-list-item-title>{{ element.product_name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="deleteElement(element.product_id)">delete</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      elements: [],
      newElement: '',
    };
  },
  created() {
    this.loadElements();
  },
  methods: {
    async loadElements() {
      try {
        const response = await axios.get('/products/product/'); // Cambia la URL según tu backend
        this.elements = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async addElement() {
      try {
        const response = await axios.post('/products/register/', { nombre: this.nuevoElemento }); // Cambia la URL según tu backend
        this.elements.push(response.data);
        this.newElement = ''; // Limpiar el campo después de agregar el elemento
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteElement(id) {
      try {
        await axios.delete(`/products/product/${id}`); // Cambia la URL según tu backend
        this.elements = this.elementos.filter(el => el.id !== id);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
};
</script>
