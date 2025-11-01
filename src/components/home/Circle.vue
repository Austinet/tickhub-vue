<script setup>
// import { defineProps } from 'vue';
defineProps({
  className: {
    type: String,
    default: ""
  } 
})
</script>

<template>
    <div :class="`${className} w-[50px] h-[50px] xl:w-[120px] xl:h-[120px] bg-blue-600 rounded-full absolute`"></div>
</template>