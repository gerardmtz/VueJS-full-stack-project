<template>
    <v-main>
      <div class="d-flex justify-center align-center" style="min-height: 100vh;">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" min-width="448" rounded="lg">
          <h1>Sign Up</h1>
          <div class="text-subtitle-1 text-medium-emphasis">Username</div>
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
          
  
          <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="register">
            Sign Up
          </v-btn>
        </v-form>
          <v-card-text class="text-center">
            <router-link to="/login" class="text-blue text-decoration-none">
              Log In Now <v-icon icon="mdi-chevron-right"></v-icon>
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
    data: () => ({
      visible: false,
      username: '',
      password: '',
      rulesPwd: [
        v => !!v || 'The password is required'
      ],
      rulesUsr: [
        v => !!v || 'The user is required'
      ]
    }),
    methods: {
      async register() {
        try {
          const response = await axios.post('/users/register', {
            username: this.username,
            password: this.password,
          });
          console.log(response.data);
          swal.fire({
            title: 'User registered successfully',
            text: 'Now log in to access your account',
            icon: 'success',
          });
          this.$router.push({name: 'login'});
          this.$refs.form.reset();
        } catch (error) {
          console.error('Error registering:', error);
          swal.fire({
            title: 'User registration failed :(',
            text: 'An error occurred',
            icon: 'error'
          });
          this.$refs.form.reset();
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
  