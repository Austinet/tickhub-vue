<script setup>
import { ref } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import TicketCard from "../components/dashboard/TicketCard.vue";
import ViewTicket from "../components/dashboard/ViewTicket.vue";
import UpdateTicket from "../components/form/UpdateTicket.vue";
import AddTicket from "../components/form/AddTicket.vue";

const showAddTicketForm = ref(false);
const showUpdateTicketForm = ref(false);
const showViewTicketForm = ref(false);
const ticketItem = ref({});
//   const { dispatch, ticketList } = useAuthContext();
const ticketList = ref([{
    id: "ttt",
    title: "gggggggg",
    description: "jjjjjjj",
    status: "open"
}]);

const toggleShowForm = (form) => {
  switch (form) {
    case "ADD_TICKET":
      showAddTicketForm.value = !showAddTicketForm.value;
      break;
    case "UPDATE_TICKET":
      showUpdateTicketForm.value = !showUpdateTicketForm.value;
      break;
    case "VIEW_TICKET":
      showViewTicketForm.value = !showViewTicketForm.value;
      break;

    default:
      break;
  }
};

const updateTicket = (ticket) => {
  ticketItem.value = ticket;
  toggleShowForm("UPDATE_TICKET");
};

const viewTicket = (ticket) => {
  ticketItem.value = ticket;
  toggleShowForm("VIEW_TICKET");
};

const deleteTicket = (id) => {
  if (!confirm("Are you sure you want to delete this ticket?")) return;
  dispatch({ type: "DELETE_TICKET", payload: id });
};
</script>

<template>
  <DashboardLayout>
    <section>
      <!-- Header -->
      <div
        className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:items-center mb-12"
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
        <button
          @click="toggleShowForm('ADD_TICKET')"
          className=" bg-blue-800 text-white w-fit px-[1.1rem] py-[0.8rem] md:px-[1.3rem] md:py-4 rounded-[5px] outline-none flex items-center gap-2 text-[1.3rem] font-medium hover:opacity-90"
        >
          <span>+</span>
          <span>Add Ticket</span>
        </button>
      </div>

      <!-- Tickets  -->
      <p v-if="!ticketList.length">No tickets to display</p>
      <div
        v-else
        className="flex flex-col flex-wrap gap-14 items-center lg:flex-row "
      >
        <TicketCard
          v-for="ticket in ticketList"
          :key="ticket.id"
          :ticket="ticket"
          :deleteTicket="deleteTicket"
          :updateTicket="updateTicket"
          :viewTicket="viewTicket"
        />
      </div>

      <!-- Add Ticket Form  -->
      <AddTicket v-if="showAddTicketForm" :toggleShowForm="toggleShowForm" />

      <!-- View Ticket Form  -->
      <ViewTicket
        v-if="showViewTicketForm"
        :ticket="ticketItem"
        :toggleShowForm="toggleShowForm"
      />

      <!-- Update Ticket Form  -->
      <UpdateTicket
        v-if="showUpdateTicketForm"
        :ticket="ticketItem"
        :toggleShowForm="toggleShowForm"
      />
    </section>
  </DashboardLayout>
</template>
