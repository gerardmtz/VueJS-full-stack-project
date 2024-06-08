<template>
  <v-main>
  <v-container>
    <!-- Formulario para agregar un nuevo elemento -->
    <v-form @submit.prevent="addElement" ref="form">
      <v-text-field v-model="nameProduct" label="New Product" required></v-text-field>
      <v-text-field v-model.number="price" label="Price" type="number" required :rules="priceRules"></v-text-field>
      <v-select v-model="hasDiscount" :items="['yes', 'no']" label="Has Discount" required></v-select>
      <v-text-field v-model.number="priceDiscount" label="Price Discounted" type="number" required :rules="priceDiscountRules"></v-text-field>
      <v-btn type="submit">Add</v-btn>
    </v-form>

    <!-- Lista de elementos existentes -->
    <v-list>
      <v-list-item v-for="element in elements" :key="element.product_id">
        <v-list-item-content>
          <v-list-item-title>{{ element.product_name }}</v-list-item-title>
          <v-list-item-subtitle>Price: {{ element.price }}</v-list-item-subtitle>
          <v-list-item-subtitle>Has Discount: {{ element.has_discount ? 'Yes' : 'No' }}</v-list-item-subtitle>
          <v-list-item-subtitle>Discounted Price: {{ element.discount_price }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="deleteElement(element.product_id)">Delete</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</v-main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      elements: [],
      nameProduct: '',
      price: null,
      hasDiscount: '',
      priceDiscount: null,
      priceRules: [
        v => !!v || 'Price is required',
        v => /^[0-9]*$/.test(v) || 'Price must be a number'
      ],
      priceDiscountRules: [
        v => !!v || 'Price Discount is required',
        v => /^[0-9]*$/.test(v) || 'Price Discount must be a number'
      ]
    };
  },
  created() {
    this.loadElements();
  },
  methods: {
    async loadElements() {
      try {
        const response = await axios.get('/products/product/');
        this.elements = response.data;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async addElement() {
      try {
        const response = await axios.post('/products/register', {
          product_name: this.nameProduct,
          price: this.price,
          has_discount: this.hasDiscount === 'yes',
          discount_price: this.priceDiscount
        });
        this.elements.push(response.data);
        this.$refs.form.reset();  // Resetear el formulario después de agregar el producto
        this.nameProduct = '';
        this.price = null;
        this.hasDiscount = '';
        this.priceDiscount = null;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteElement(id) {
      try {
        await axios.delete(`/products/product/${id}`);
        this.elements = this.elements.filter(el => el.product_id !== id);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  },
};
</script>
