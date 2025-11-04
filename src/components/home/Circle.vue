<script setup>
// import { defineProps } from 'vue';
defineProps({
  className: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    :class="`${className} w-[50px] h-[50px] xl:w-[100px] xl:h-[100px] bg-blue-600 rounded-full absolute circle`"
  ></div>
</template>

<style scoped>
.circle {
  animation: up-and-down 1s alternate infinite;
}
@keyframes up-and-down {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
