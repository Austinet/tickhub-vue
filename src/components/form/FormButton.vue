<script setup>
defineProps({
  label: String,
  className: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button
    type="submit"
    :className="`${className} outline-none w-full py-4 text-lg md:text-xl text-center font-semibold bg-blue-600 text-white rounded-lg mt-6 mb-2 hover:bg-blue-700`"
  >
    {{ label }}
  </button>
</template>
