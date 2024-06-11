<template>
  <v-main>
  <v-container v-if="isAdmin">
    <v-form @submit.prevent="isEditing ? updateElement() : addElement()" ref="form">
      <v-text-field v-model="nameProduct" label="Product Name" required></v-text-field>
      <v-text-field v-model.number="price" label="Price" type="number" required :rules="priceRules"></v-text-field>
      <v-select v-model="hasDiscount" :items="['yes', 'no']" label="Has Discount" required></v-select>
      <v-text-field v-model.number="priceDiscount" label="Discounted Price" type="number" :rules="priceDiscountRules"></v-text-field>
      <v-file-input v-model="file" label="Product Image" accept="image/*"></v-file-input>
      <v-btn type="submit">{{ isEditing ? 'Update' : 'Add' }}</v-btn>
      <v-btn v-if="isEditing" @click="cancelEdit">Cancel</v-btn>
    </v-form>

    <v-list>
      <v-list-item v-for="element in elements" :key="element.product_id">
        <v-list-item-content>
          <v-list-item-title>{{ element.product_name }}</v-list-item-title>
          <v-list-item-subtitle>Price: {{ element.price }}</v-list-item-subtitle>
          <v-list-item-subtitle>Has Discount: {{ element.has_discount ? 'Yes' : 'No' }}</v-list-item-subtitle>
          <v-list-item-subtitle>Discounted Price: {{ element.discount_price }}</v-list-item-subtitle>
          <v-img v-if="element.image_url" :src="element.image_url" alt="Product Image" max-width="200"></v-img>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn @click="editElement(element)">Edit</v-btn>
          <v-btn @click="deleteElement(element.product_id)">Delete</v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
  <v-container v-else>
    <v-alert type="error">Access denied. Only administrators can manage products.</v-alert>
  </v-container>
</v-main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      elements: [],
      nameProduct: '',
      price: null,
      hasDiscount: '',
      priceDiscount: null,
      file: null,
      isEditing: false,
      editingProductId: null,
      priceRules: [
        v => !!v || 'Price is required',
        v => /^[0-9]*$/.test(v) || 'Price must be a number'
      ],
      priceDiscountRules: [
        v => !!v || 'Discounted Price is required',
        v => /^[0-9]*$/.test(v) || 'Discounted Price must be a number'
      ]
    };
  },
  created() {
    this.loadElements();
  },
  computed: {
    ...mapGetters(['isAdmin']),
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
        const formData = new FormData();
        formData.append('product_name', this.nameProduct);
        formData.append('price', this.price);
        formData.append('has_discount', this.hasDiscount === 'yes');
        formData.append('discount_price', this.priceDiscount);
        if (this.file) {
          formData.append('file', this.file);
        }

        const response = await axios.put('/products/product/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.elements.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async updateElement() {
      try {
        const formData = new FormData();
        formData.append('product_name', this.nameProduct);
        formData.append('price', this.price);
        formData.append('has_discount', this.hasDiscount === 'yes');
        formData.append('discount_price', this.priceDiscount);
        if (this.file) {
          formData.append('file', this.file);
        }

        const response = await axios.put(`/products/product/${this.editingProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const index = this.elements.findIndex(element => element.product_id === this.editingProductId);
        this.elements.splice(index, 1, response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async deleteElement(id) {
      try {
        await axios.delete(`/products/product/${id}`);
        this.elements = this.elements.filter(element => element.product_id !== id);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    editElement(element) {
      this.nameProduct = element.product_name;
      this.price = element.price;
      this.hasDiscount = element.has_discount ? 'yes' : 'no';
      this.priceDiscount = element.discount_price;
      this.file = null;
      this.isEditing = true;
      this.editingProductId = element.product_id;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.nameProduct = '';
      this.price = null;
      this.hasDiscount = '';
      this.priceDiscount = null;
      this.file = null;
      this.isEditing = false;
      this.editingProductId = null;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
