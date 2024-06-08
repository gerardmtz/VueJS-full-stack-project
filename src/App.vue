<template>
  <v-app>
    <NavBar/>
    <v-content>
      <router-view>
      </router-view>
    </v-content>
  </v-app>
  <p></p>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    NavBar
  }
}
</script>