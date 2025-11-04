<script setup>
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import Toast from "../components/form/Toast.vue";
import { inject } from "vue";

const route = useRoute();
const router = useRouter();
const ticketID = route.params.id;

const props = defineProps({
  ticket: Object,
  success: Boolean,
});

const resetTicket = {
  title: "",
  description: "",
  status: "",
};

const ticketErrors = {
  title: false,
  description: false,
  status: false,
};

const updateTicket = reactive({});
const isLoading = ref(true);
const updateTicketErrors = reactive(ticketErrors);
const success = ref(false);
const serverError = ref("");
const appStore = inject("appStore");

const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9\s]{5,}$/;
const DESCRIPTION_REGEX = /^[a-zA-Z][a-zA-Z0-9\s]{5,}$/;

onMounted(() => {
  const ticketList = appStore.getTickets();

  try {
    const ticket = ticketList.find((ticket) => ticket.id === ticketID);
    if (!ticket) {
      throw new Error("Ticket not found");
      return;
    }
    Object.assign(updateTicket, ticket);
    isLoading.value = false;
  } catch (error) {
    serverError.value = error;
    console.log(error);
  }
});

// Update Ticket
const validateField = (field) => {
  switch (field) {
    case "title":
      updateTicketErrors.title = TITLE_REGEX.test(updateTicket.title)
        ? null
        : true;
      break;
    case "description":
      updateTicketErrors.description = DESCRIPTION_REGEX.test(
        updateTicket.description
      )
        ? null
        : true;
      break;
    case "status":
      updateTicketErrors.status = ["open", "in_progress", "closed"].includes(
        updateTicket.status
      )
        ? null
        : true;
      break;
    default:
      break;
  }
};

function validateForm() {
  ["title", "description", "status"].forEach((field) => {
    validateField(field);
  });

  return (
    !updateTicketErrors.title &&
    !updateTicketErrors.description &&
    !updateTicketErrors.status
  );
}

const handleSubmit = () => {
  if (validateForm()) {
    const ticket = {};

    for (const key in updateTicket) {
      ticket[key] = updateTicket[key];
    }

    appStore.updateTicket(ticket);
    success.value = true;

    // Reset
    Object.assign(updateTicket, resetTicket);
  } else {
    // focus on the first invalid field
    const el = document.querySelector(`[aria-invalid='true']`);
    if (el) el.focus();
  }
};

const closeForm = () => {
  success.value = false;
  router.push("/tickets");
};
</script>

<template>
  <DashboardLayout>
    <RouterLink to="/tickets">Go back</RouterLink>
    <section className="w-full mt-4">
      <p v-if="serverError" class="text-lg text-red-600">{{ serverError }}</p>

      <p v-if="isLoading">Loading</p>
      <div
        v-else
        className="w-full bg-white max-w-[700px] p-4 lg:p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-medium mb-8">Update Ticket</h2>

        <form @submit.prevent="handleSubmit">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-[1.3rem] mb-2 font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-none"
              placeholder="Enter ticket title"
              v-model="updateTicket.title"
              @input="validateField('title')"
              @blur="validateField('title')"
              required
            />
            <span v-if="updateTicketErrors.title" className="text-red-600">
              Please enter a valid title, Must be more than 5 characters,
              beginning with a letter
            </span>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-[1.3rem] mb-2 font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter task description"
              required
              v-model="updateTicket.description"
              @input="validateField('description')"
              @blur="validateField('description')"
              className="w-full h-[90px] p-[0.9rem] border rounded text-[1.1rem] outline-none resize-none"
            ></textarea>
            <span
              v-if="updateTicketErrors.description"
              className="text-red-600"
            >
              Please enter a valid description, Must be more than 5 characters,
              beginning with a letter
            </span>
          </div>
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-[1.3rem] mb-2 font-medium text-gray-700"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              v-model="updateTicket.status"
              @change="validateField('status')"
              required
              className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-none"
            >
              <option value="">Select ticket status</option>
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="closed">Closed</option>
            </select>
            <span v-if="updateTicketErrors.status" className="text-red-600">
              Please select ticket status
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-4 px-6 rounded bg-blue-800 text-white outline-none text-[1.2rem] font-medium mt-2  hover:opacity-90"
          >
            Save Ticket
          </button>
        </form>
      </div>

      <!-- Successful ticket updated overlay  -->
      <Toast
        :success="success"
        message="Ticket Updated Successfully"
        :closeForm="closeForm"
      />
    </section>
  </DashboardLayout>
</template>
