<template>
    <v-main>
      <div class="d-flex justify-center align-center" style="min-height: 100vh;">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" min-width="448" rounded="lg">
          <h1>Log In</h1>
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="username"
              density="compact"
              placeholder="Username"
              prepend-inner-icon="mdi-account-circle"
              variant="outlined"
              required
              :rules="rulesUsr"
            ></v-text-field>
  
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              Password
            </div>
  
            <v-text-field
              v-model="password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Enter your password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              required
              :rules="rulesPwd"
            ></v-text-field>
  
            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="login">
              Log In
            </v-btn>
          </v-form>
          <v-card-text class="text-center">
            <router-link to="/signup" class="text-blue text-decoration-none">
              Sign Up Now <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
          </v-card-text>
        </v-card>
      </div>
    </v-main>
  </template>
  
  <script>
  import axios from 'axios';
  import swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        visible: false,
        username: '',
        password: '',
        valid: false,
        rulesPwd: [
          v => !!v || 'The password is required'
        ],
        rulesUsr: [
          v => !!v || 'The username is required'
        ]
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('/users/login', {
            username: this.username,
            password: this.password,
          });
  
          const user = response.data;
  
          // Guarda el token y el usuario en el store
          this.$store.dispatch('login', user);
  
          swal.fire({
            title: 'Logged in successfully',
            text: 'Welcome back :) ' + this.username,
            icon: 'success',
          });
  
          this.$router.push({ name: 'home' });
          this.$refs.form.reset();
        } catch (error) {
          console.error('Error logging in:', error);
          swal.fire({
            title: 'User log in failed :(',
            text: 'An error occurred',
            icon: 'error'
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .text-decoration-none {
    text-decoration: none;
  }
  </style>
  