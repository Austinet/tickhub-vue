<script setup>
const props = defineProps({
  success: {
    type: Boolean,
  },

  closeForm: {
    type: Function,
  },

  message: {
    type: String,
  },
});
</script>

<template>
  <section
    :className="`${
      !success && 'hidden'
    } fixed bg-[#000000d7] w-full h-full top-0 left-0 flex items-center justify-center z-20`"
  >
    <div
      className="w-[90%] max-w-[500px] h-[300px] bg-white shadow-xl rounded-lg flex justify-center items-center flex-col text-center"
    >
      <!-- <AiOutlineCheck className="inline-block text-[3.5rem] md:text-[4.5rem] text-green-700" /> -->
      Ic
      <h2 className="text-xl xl:text-2xl font-semibold mb-6">{{ message }}</h2>
      <button
        @click="closeForm"
        className="w-[250px] py-3 text-lg md:text-xl text-center font-semibold bg-blue-600 text-white rounded-lg "
      >
        Close
      </button>
    </div>
  </section>
</template>
