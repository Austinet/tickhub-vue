<script setup>
import { ref } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import TicketCard from "../components/dashboard/TicketCard.vue";
import ViewTicket from "../components/dashboard/ViewTicket.vue";
import { inject } from "vue";

const showTicket = ref(false);
const ticketItem = ref({});
const appStore = inject("appStore");
const ticketList = ref(appStore.getTickets());

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
        className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center mb-12"
      >
        <div>
          <h1
            className="text-gray-700 text-2xl md:text-3xl font-medium leading-tight mb-2"
          >
            Tickets
          </h1>
          <p className="text-[1.2rem] text-gray-800">
            Manage and track all your tickets
          </p>
        </div>
        <RouterLink
          to="/tickets/add"
          className=" bg-blue-800 text-white w-fit px-[1.1rem] py-[0.8rem] md:px-[1.3rem] md:py-4 rounded-[5px] outline-none flex items-center gap-2 text-[1.3rem] font-medium hover:opacity-90"
        >
          <span>+</span>
          <span>Add Ticket</span>
        </RouterLink>
      </div>

      <!-- Tickets  -->
      <p v-if="!ticketList.length">No tickets to display</p>
      <div
        v-else
        className="flex flex-wrap gap-10 items-center justify-center md:justify-between"
      >
        <TicketCard
          v-for="ticket in ticketList"
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
