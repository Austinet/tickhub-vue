<script setup>
import { ref } from "vue";

const navLinks = [
  {
    id: 1,
    href: "#hero",
    label: "About",
  },
  {
    id: 2,
    href: "#features",
    label: "Features",
  },
  {
    id: 3,
    href: "#footer",
    label: "Contact",
  },
];

const openMenu = ref(false);

const toggleMenu = () => {
  openMenu.value = !openMenu.value;
};
</script>

<template>
  <header
    class="px-4 py-4 relative flex justify-between items-center lg:px-6 lg:py-7 shadow"
  >
    <!-- Logo container  -->
    <RouterLink to="/">
      <div class="flex items-center gap-[0.35rem] font-semibold text-[1.4rem]">
        <!-- <FaTicketSimple class="text-indigo-600" /> -->
        <h2 class="text-blue-700">TickHub</h2>
      </div>
    </RouterLink>

    <!-- NavBar  -->
    <div class="flex items-center">
      <nav
        :class="`absolute left-0 lg:static space-y-6 ${
          openMenu ? 'top-16' : '-top-80'
        } bg-white z-20 px-4 pb-[1.5rem] w-full lg:p-0 lg:w-fit lg:flex lg:items-center lg:space-y-0 lg:gap-16 shadow-lg lg:shadow-none`"
      >
        <ul class="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-16">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="link.href"
              class="font-medium text-[1.1rem] text-gray-700 lg:pb-1.5 hover:border-b-2 hover:border-b-gray-900"
              >{{ link.label }}</a
            >
          </li>
        </ul>
        <RouterLink
          to="/login"
          class="inline-block bg-blue-600 px-[2.2rem] py-[0.7rem] lg:px-10 lg:py-4 rounded-[15px] text-white text-[1.2rem] font-bold hover:opacity-80"
        >
          Login
        </RouterLink>
      </nav>

      <!-- Menu icon for mobile  -->
      <button class="outline-none lg:hidden" @click="toggleMenu">
        <!-- {openMenu ? (
            <IoClose class="text-[1.8rem]" />
          ) : (
            <IoMenu class="text-[1.8rem]" />
          )} -->
        Menu
      </button>
    </div>
  </header>
</template>
