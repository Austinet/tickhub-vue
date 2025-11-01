<script setup>
const socialLinks = [
  {
    id: 1,
    href: "/",
    icon: "Fb"
    // icon: <FaFacebook className="hover:scale-150" />,
  },
  {
    id: 2,
    href: "/",
    icon: "X"
    // icon: <FaXTwitter className="hover:scale-150" />,
  },
  {
    id: 3,
    href: "/",
    icon: "In"
    // icon: <FaLinkedin className="hover:scale-150" />,
  },
];

const year = new Date().getFullYear()
</script>
<template>
<footer className="bg-blue-950 text-white" id="footer">
      <div className="max-w-[1440px] mx-auto px-4 pt-8 md:pt-10 pb-8 text-center space-y-10 md:space-y-16">
         <!-- Contact  -->
        <ul className="flex justify-center items-center gap-10 text-[1.3rem] lg:text-[2rem] font-medium md:gap-15">
              <li v-for="link in socialLinks" :key="link.id">
                <a :href="link.href">{{link.icon}}</a>
              </li>
        </ul>

         <!-- Copyright  -->
        <div>
          <p>&copy; {{ year }} All rights reserved</p>
        </div>
      </div>
    </footer>
</template>