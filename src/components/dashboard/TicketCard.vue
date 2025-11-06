<script setup>
import { PhEye, PhPencilSimple, PhTrash } from "@phosphor-icons/vue";
import { RouterLink } from "vue-router";

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

const props = defineProps({
  ticket: Object,
  viewTicket: Function,
  updateTicket: Function,
  deleteTicket: Function,
});

const { id, title, description, status } = props.ticket;
</script>

<template>
  <div
    :className="`border-l-4 h-[200px] ${statusBorderStyles[status]} flex flex-col justify-between space-y-3 bg-white px-4 py-4 rounded-lg shadow w-[300px]`"
  >
    <div className="space-y-2">
      <h3 className="text-[1.2rem] font-medium">
        {{ title.length < 22 ? title : `${title.substring(0, 24)}...` }}
      </h3>
      <p className="text-[1.1rem]">
        {{
          description.length < 60
            ? description
            : `${description.substring(0, 60)}...`
        }}
      </p>
      <p
        :className="`${statusStyles[status]} w-fit px-2 py-1 text-lg rounded-xl`"
      >
        {{ status === "in_progress" ? "In progress" : status }}
      </p>
    </div>
    <div className="flex items-center justify-between gap-12 text-2xl">
      <button
        @click="viewTicket(props.ticket)"
        className="text-green-700 outline-none hover:scale-110"
      >
        <PhEye />
      </button>
      <router-link
        :to="`/tickets/update/${id}`"
        className="text-blue-700 outline-none hover:scale-110"
      >
        <PhPencilSimple />
      </router-link>
      <button
        @click="deleteTicket(id)"
        className="text-red-700 outline-none hover:scale-110"
      >
        <PhTrash />
      </button>
    </div>
  </div>
</template>
