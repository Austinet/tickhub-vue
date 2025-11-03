<script setup>
import { reactive, ref } from "vue";
import Toast from "./Toast.vue";
import { inject } from "vue";

const props = defineProps({
  toggleShowForm: Function,
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

const newTicket = reactive(resetTicket);
const newTicketErrors = reactive(ticketErrors);
const success = ref(false);
const appStore = inject("appStore");

const TITLE_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;
const DESCRIPTION_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;

// Add Ticket
const validateField = (field) => {
  // submitted.value = false;
  switch (field) {
    case "title":
      newTicketErrors.title = TITLE_REGEX.test(newTicket.title) ? null : true;
      break;
    case "description":
      newTicketErrors.description = DESCRIPTION_REGEX.test(
        newTicket.description
      )
        ? null
        : true;
      break;
    case "status":
      newTicketErrors.status = ["open", "in_progress", "closed"].includes(
        newTicket.status
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
    !newTicketErrors.title &&
    !newTicketErrors.description &&
    !newTicketErrors.status
  );
}

const addTicket = () => {
  if (validateForm()) {
    const ticket = {};

    for (const key in newTicket) {
      ticket[key] = newTicket[key];
    }

    appStore.addTicket(ticket);
    success.value = true;

    // Reset
    Object.assign(newTicket, resetTicket);
  } else {
    // focus on the first invalid field
    const el = document.querySelector(`[aria-invalid='true']`);
    if (el) el.focus();
  }
};

const closeForm = () => {
  props.toggleShowForm("ADD_TICKET");
  success.value = false;
};
</script>

<template>
  <section
    className="fixed flex justify-center items-center bg-[#000000cc] top-0 left-0 w-full min-h-screen p-4"
  >
    <div className="w-full bg-white max-w-[700px] p-4 lg:p-8 rounded-lg shadow">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium">Create New Ticket</h2>
        <button className="text-[1.5rem] outline-none" @click="closeForm">
          <!-- <IoClose /> -->
          x
        </button>
      </div>

      <form @submit.prevent="addTicket">
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
            v-model="newTicket.title"
            @input="validateField('title')"
            @blur="validateField('title')"
            required
          />
          <span v-if="newTicketErrors.title" className="text-red-600">
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
            v-model="newTicket.description"
            @input="validateField('description')"
            @blur="validateField('description')"
            className="w-full h-[90px] p-[0.9rem] border rounded text-[1.1rem] outline-none resize-none"
          ></textarea>
          <span v-if="newTicketErrors.description" className="text-red-600">
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
            v-model="newTicket.status"
            @input="validateField('status')"
            @blur="validateField('status')"
            required
            className="w-full p-[0.9rem] border rounded text-[1.1rem] outline-none"
          >
            <option value="">Select ticket status</option>
            <option value="open">Open</option>
            <option value="in_progress">In progress</option>
            <option value="closed">Closed</option>
          </select>
          <span v-if="newTicketErrors.status" className="text-red-600">
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

    <!-- Successful ticket creation overlay  -->
    <Toast
      :success="success"
      message="Ticket Added Successfully"
      :closeForm="closeForm"
    />
  </section>
</template>
