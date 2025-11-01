<script setup>
import Footer from './components/home/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="max-w-[1440px] mx-auto">
    <RouterView />
    <Footer />
  </div>

  <!-- <h1 v-if class="bg-blue-300">bbbb </h1> -->
</template>
