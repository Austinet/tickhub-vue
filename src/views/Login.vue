<script setup>
import { ref, computed, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import dashboardBG from "../assets/images/illustration-hero.svg";
import Toast from "../components/form/Toast.vue";
import FormButton from "../components/form/FormButton.vue";
import OnBoardingLayout from "../layouts/OnBoardingLayout.vue";
import { inject } from "vue";

//Default values for user inputs and error checking
const defaultDetails = {
  email: "",
  password: "",
  keepLoggedIn: false,
};

const defaultUserErrors = {
  email: false,
  password: false,
};

const userLogin = reactive(defaultDetails);
const userLoginErrors = reactive(defaultUserErrors);
const showPassword = ref(false);
const router = useRouter();
const appStore = inject("appStore");

//Toggles the password view from hidden to seen for the user
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

//Validates user and makes login requests
const handleSubmit = () => {
  const usersDB = appStore.getUsers();

  const authenticateUser = usersDB?.find(
    (user) => user.email === userLogin.email
  );

  if (authenticateUser) {
    userLoginErrors.email = null;
    if (authenticateUser.password === userLogin.password) {
      appStore.login(authenticateUser);
      router.push("/dashboard");
    } else {
      userLoginErrors.password = true;
    }
  } else {
    userLoginErrors.email = true;
  }
};
</script>

<template>
  <OnBoardingLayout>
    <section className="max-w-[1440px] mx-auto">
      <div className="px-4 mx-auto my-8 lg:my-12 xl:flex gap-10">
        <figure className="bg-blue-700 xl:w-1/2 rounded-lg md:hidden xl:block">
          <img
            :src="dashboardBG"
            className=" object-cover object-center"
            alt="Dashboard background"
          />
        </figure>
        <div className="xl:w-1/2 py-2 md:pt-6">
          <div className="mb-6 lg:mb-8">
            <h1
              className="text-[1.7rem] xl:text-[2rem] text-[#000000d5] font-semibold"
            >
              Login
            </h1>
          </div>
          <div>
            <form @submit.prevent="handleSubmit">
              <div className="flex flex-col gap-3 md:gap-8 mb-3 md:mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    v-model="userLogin.email"
                    id="email"
                    className="border border-[#00000093] w-full h-[3.13rem] md: rounded-lg px-3 outline-none focus:border-2"
                    required
                  />
                  <span v-if="userLoginErrors.email" className="text-red-600">
                    Email not found, please sign up
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2 lg:mb-4"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      :type="showPassword ? 'text' : 'password'"
                      name="password"
                      v-model="userLogin.password"
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                      required
                    />
                    <button
                      className="absolute right-3 top-[0.62rem] outline-none"
                      @click="toggleShowPassword"
                      type="button"
                    >
                      {{ showPassword ? "Cp" : "Op" }}
                    </button>
                  </div>
                  <span
                    v-if="userLoginErrors.password"
                    className="text-red-600"
                  >
                    Incorrect password
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input
                    id="keepLoggedIn"
                    type="checkbox"
                    checked="userLogin.keepLoggedIn"
                    v-model="userLogin.keepLoggedIn"
                  />
                  <label
                    htmlFor="keepLoggedIn"
                    className="text-lg md:font-medium"
                  >
                    <span>Keep me logged in</span>
                  </label>
                </div>
              </div>
              <FormButton label="Login" />
              <div className="text-center">
                <p className="text-[1.125rem] text-[#000000d5] font-medium">
                  <span>Don&apos;t have an account? </span>
                  <RouterLink to="/register" className="text-blue-600">
                    Sign up
                  </RouterLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </OnBoardingLayout>
</template>
