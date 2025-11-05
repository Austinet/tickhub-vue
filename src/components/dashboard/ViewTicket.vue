<script setup>
import { PhX } from "@phosphor-icons/vue";

const props = defineProps({
  ticket: Object,
  closeForm: Function,
});

const statusStyles = {
  open: "bg-green-200 text-green-800",
  in_progress: "bg-amber-200 text-amber-800",
  closed: "bg-gray-200 text-gray-800",
};

const statusBorderStyles = {
  open: "border-l-green-500",
  in_progress: "border-l-amber-500",
  closed: "border-l-gray-500",
};
</script>

<template>
  <section
    class="fixed flex justify-center items-center bg-[#000000cc] top-0 left-0 w-full min-h-screen p-4"
  >
    <div
      :class="`border-l-[0.6rem] ${
        statusBorderStyles[ticket.status]
      } w-full bg-white max-w-[700px] p-8 rounded-lg shadow`"
    >
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-medium">About Ticket</h2>
        <button class="text-[1.5rem] outline-none" @click="closeForm">
          <PhX />
        </button>
      </div>

      <div>
        <div class="mb-6">
          <h3 class="text-[1.3rem] mb-1 font-medium text-gray-800">Title</h3>
          <p class="text-lg">{{ ticket.title }}</p>
        </div>

        <div class="mb-6">
          <h3 class="text-[1.3rem] mb-1 font-medium text-gray-800">
            Description
          </h3>
          <p class="text-lg">{{ ticket.description }}</p>
        </div>
        <div>
          <h3 class="text-[1.3rem] mb-1 font-medium text-gray-800">Status</h3>
          <p
            :class="`${
              statusStyles[ticket.status]
            } w-fit px-2 py-1 text-lg rounded-xl`"
          >
            {{
              ticket.status === "in_progress" ? "In progress" : ticket.status
            }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
