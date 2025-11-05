<script setup>
import Toast from "../components/form/Toast.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { inject } from "vue";
import { PhCaretLeft } from "@phosphor-icons/vue";
const router = useRouter();

const props = defineProps({
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

const TITLE_REGEX = /^(?=.*[A-Za-z])[A-Za-z0-9\s.,!?'’"()\-:]{5,100}$/;
const DESCRIPTION_REGEX = /^(?=.*[A-Za-z])[\w\s.,!?'"@#%&()\-:;\/]{10,500}$/;

// Add Ticket
const validateField = (field) => {
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
  success.value = false;
  router.push("/tickets");
};
</script>

<template>
  <DashboardLayout>
    <section
      className="w-full bg-white max-w-[700px] p-4 lg:p-8 rounded-lg shadow"
    >
      <div className="mb-8">
        <RouterLink
          to="/tickets"
          class="text-lg flex items-center gap-1 hover:text-slate-500"
        >
          <PhCaretLeft /> <span>Go back</span>
        </RouterLink>
        <h2 className="text-2xl font-medium mt-4">Create New Ticket</h2>
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
            @change="validateField('status')"
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

      <!-- Successful ticket creation overlay  -->
      <Toast
        :success="success"
        message="Ticket Added Successfully"
        :closeForm="closeForm"
      />
    </section>
  </DashboardLayout>
</template>
