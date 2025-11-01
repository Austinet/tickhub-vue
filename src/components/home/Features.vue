<script setup>
import Circle from './Circle.vue';

const features = [
  {
    id: 1,
    title: "Centralized Ticket Box",
    description:
      "Easily create and manage tickets with a clean and user-friendly interface",
    // icon: <MdOutlineDashboard className="inline text-blue-900 text-4xl" />,
    icon: "ic",
  },
  {
    id: 2,
    title: "Automated Workflows",
    description:
      "Automate ticket routing, assignments, and escalations to resolve issues faster",
    // icon: <MdFlashAuto className="inline text-blue-900 text-4xl" />,
    icon: "ic",
  },
  {
    id: 3,
    title: "Insightful Reporting",
    description:
      "Track performance, monitor progress with detailed reports powerful analytics",
    // icon: <MdInsertChart className="inline text-blue-900 text-4xl" />,
    icon: "ic"
  },
];
</script>

<template>
   <section className=" bg-gray-50" id="features">
      <div className="relative px-4 py-10">
         <!-- Feature header  -->
        <div className="pb-10 md:my-10 text-center space-y-4 max-w-[600px] mx-auto text-gray-800">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            Features
          </h2>
          <p className="mt-4 text-base md:text-lg">
            Everything you need for exceptional support. A powerful, yet
            simple-to-use platform for managing all your tickets
          </p>

           <!-- Circle  -->
          <Circle className="top-[0.5rem] right-4 lg:top-8 lg:right-12" />
        </div>

         <!-- Features  -->
        <div className="flex flex-col gap-14 items-center text-center lg:flex-row lg:justify-between lg:pb-10">
              <div
              v-for="feature in features" :key="feature.id"
                className="space-y-3 bg-white px-4 py-7 rounded-2xl shadow max-w-[350px]"
              >
                <div>
                  {{ feature.icon }}
                  <h3 className="text-lg lg:text-2xl font-medium mt-1">
                    {{feature.title}}
                  </h3>
                </div>
                <div>
                  <p className="text-base md:text-lg">{{ feature.description }}</p>
                </div>
              </div>
        </div>
      </div>
    </section>
</template>