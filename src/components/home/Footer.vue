<script setup>
import {
  PhFacebookLogo,
  PhLinkedinLogo,
  PhTwitterLogo,
  PhXLogo,
} from "@phosphor-icons/vue";

const socialLinks = [
  {
    id: 1,
    href: "/",
    icon: "facebook",
  },
  {
    id: 2,
    href: "/",
    icon: "x",
  },
  {
    id: 3,
    href: "/",
    icon: "linkedin",
  },
];

const year = new Date().getFullYear();
</script>
<template>
  <footer className="bg-blue-950 text-white" id="footer">
    <div
      className="max-w-[1440px] mx-auto px-4 pt-8 md:pt-10 pb-8 text-center space-y-10 md:space-y-16"
    >
      <!-- Contact  -->
      <ul
        className="flex justify-center items-center gap-10 text-[1.3rem] lg:text-[2rem] font-medium md:gap-20"
      >
        <li v-for="link in socialLinks" :key="link.id">
          <RouterLink :to="link.href">
            <!-- Social link icon  -->
            <PhFacebookLogo
              v-if="link.icon === 'facebook'"
              class="inline text-white text-3xl hover:scale-150"
            />
            <PhXLogo
              v-else-if="link.icon === 'x'"
              class="inline text-white text-3xl hover:scale-150"
            />
            <PhLinkedinLogo
              v-else
              class="inline text-white text-3xl hover:scale-150"
            />
          </RouterLink>
        </li>
      </ul>

      <!-- Copyright  -->
      <div>
        <p>&copy; {{ year }} All rights reserved</p>
      </div>
    </div>
  </footer>
</template>
