<script setup>
import { computed, ref } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import TicketCard from "../components/dashboard/TicketCard.vue";
import ViewTicket from "../components/dashboard/ViewTicket.vue";
import { inject } from "vue";

const showTicket = ref(false);
const ticketItem = ref({});
const appStore = inject("appStore");
const ticketList = ref(appStore.getTickets());

const searchQuery = ref("");
const selectedStatus = ref("all");

const filteredTickets = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase();
  const status = selectedStatus.value;

  return ticketList.value.filter((ticket) => {
    const matchQuery =
      ticket.title.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query);

    const matchStatus =
      status === "all" ? true : ticket.status.toLowerCase() === status;

    return matchQuery && matchStatus;
  });
});
const viewTicket = (ticket) => {
  ticketItem.value = ticket;
  showTicket.value = !showTicket.value;
};

const closeForm = () => {
  showTicket.value = false;
};

const deleteTicket = (id) => {
  if (!confirm("Are you sure you want to delete this ticket?")) return;
  appStore.deleteTicket(id);
  ticketList.value = appStore.getTickets();
};
</script>

<template>
  <DashboardLayout>
    <section>
      <!-- Header -->
      <div
        className="flex  md:flex-row justify-between gap-4 items-end md:items-center mb-6"
      >
        <div>
          <h1
            className="text-gray-700 text-2xl md:text-3xl font-medium leading-tight mb-2"
          >
            Tickets
          </h1>
          <p className="md:text-[1.2rem] text-gray-800 w-[150px] sm:w-fit">
            Manage and track all your tickets
          </p>
        </div>
        <RouterLink
          to="/tickets/add"
          className=" bg-blue-800 text-white w-fit px-[1rem] py-[0.8rem] md:px-[1.3rem] md:py-4 rounded-[5px] outline-none flex items-center gap-2 text-[1.1rem] md:text-[1.3rem] font-medium hover:opacity-90"
        >
          <span>+</span>
          <span>Add Ticket</span>
        </RouterLink>
      </div>

      <!-- Search and filter features -->
      <div
        class="mb-8 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-6"
      >
        <div class="w-full max-w-[400px]">
          <input
            type="text"
            className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-blue-400 "
            placeholder="Search using ticket title or decription"
            v-model="searchQuery"
          />
        </div>
        <div>
          <select
            v-model="selectedStatus"
            class="border p-[0.9rem] rounded w-[120px] focus:outline focus:outline-blue-400 text-[1.1rem]"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <!-- Tickets  -->
      <p v-if="!filteredTickets.length">No tickets to display</p>
      <div
        v-else
        className="flex flex-wrap gap-10 items-center justify-center md:justify-between"
      >
        <TicketCard
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          :ticket="ticket"
          :deleteTicket="deleteTicket"
          :viewTicket="viewTicket"
        />
      </div>

      <!-- View Ticket Form  -->
      <ViewTicket
        v-if="showTicket"
        :ticket="ticketItem"
        :closeForm="closeForm"
      />
    </section>
  </DashboardLayout>
</template>
