<script setup>
import Footer from "./components/home/Footer.vue";
import { useAppStore } from "./stores/useAppStore";
import { reactive, provide } from "vue";
import { RouterView } from "vue-router";

const appStore = useAppStore();
provide("appStore", appStore);
</script>

<template>
  <div class="max-w-[1440px] mx-auto">
    <RouterView />
    <Footer />
  </div>
</template>
