<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

//  const { authenticatedUser, dispatch } = useAuthContext();
const authenticatedUser = {
  firstName: "Austine",
};
const openMenu = ref(false);
// const { firstName,  } = authenticatedUser;
const location = useRoute();

const tabStyles = {
  active: "bg-blue-200 text-blue-800",
  others:
    "py-3 px-4 md:py-4 md:px-6 flex items-center gap-3 w-full rounded-lg font-medium text-[1.1rem] md:text-[1.2rem] hover:bg-blue-200 hover:text-blue-800 mb-3",
};

const toggleMobileMenu = () => {
  console.log(openMenu.value);
  openMenu.value = !openMenu.value;
};

const logout = () => {
  dispatch({ type: "LOG_OUT" });
};
</script>

<template>
  <div className="relative">
    <header className="p-4 md:p-8 flex justify-between items-center">
      <!-- Logo container  -->
      <div
        className="flex items-center gap-[0.35rem] font-semibold text-[1.3rem] md:text-[1.4rem] "
      >
        <!-- <FaTicketSimple className="text-indigo-600" /> -->
        <h2 className="">TickHub</h2>
      </div>

      <!-- User profile -->
      <div className="flex items-center gap-3">
        <p className="text-lg font-medium">
          Welcome, {{ authenticatedUser?.firstName }}
        </p>
        <div
          className="hidden md:flex bg-blue-600 w-[50px] h-[50px] text-white rounded-full items-center justify-center"
        >
          <p className="text-lg font-medium">
            {{ authenticatedUser.firstName.charAt(0) }}
          </p>
        </div>
        <!-- Menu icon for mobile -->
        <button className="outline-none lg:hidden" @click="toggleMobileMenu">
          <!-- {openMenu ? (
              <IoClose className="text-[1.8rem]" />
            ) : (
              <IoMenu className="text-[1.8rem]" />
            )} -->Menu
        </button>
      </div>
    </header>

    <main className="flex relative">
      <nav
        :className="`min-w-[250px] lg:min-w-[300px] min-h-[80vh] absolute lg:static ${
          openMenu ? 'left-0' : 'left-[-50rem] top-0'
        } bg-[#000a] lg:bg-white w-full lg:p-8 lg:w-fit`"
      >
        <ul className="bg-white h-screen px-4 py-6 w-[70%] lg:w-full lg:p-0">
          <li>
            <RouterLink
              to="/dashboard"
              :className="`${
                location.path === '/dashboard' && tabStyles.active
              } ${tabStyles.others}`"
            >
              <!-- <LuLayoutDashboard className="text-[1.8rem]" /> -->
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li className="mb-40">
            <RouterLink
              to="/tickets"
              :className="`${
                location.path === '/tickets' && tabStyles.active
              } ${tabStyles.others}`"
            >
              <!-- <BsTicket className="text-[1.8rem]" /> -->
              <span>Tickets</span>
            </RouterLink>
          </li>
          <li>
            <button @click="logout" :className="`${tabStyles.others} shadow`">
              <span>Logout</span>
              <!-- <MdLogout className="text-[1.8rem]" /> -->
            </button>
          </li>
        </ul>
      </nav>

      <!-- iframe  -->
      <section className="p-4 lg:p-6 bg-gray-100 w-full min-h-[70vh]">
        <slot></slot>
      </section>
    </main>
  </div>
</template>
