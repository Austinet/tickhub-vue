<script setup>
import { ref, computed, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import dashboardBG from "../assets/images/illustration-hero.svg";
import Toast from "../components/form/Toast.vue";
import FormButton from "../components/form/FormButton.vue";
import OnBoardingLayout from "../layouts/OnBoardingLayout.vue";

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
  const passwordType= ref("password");
  const passwordView = ref(null);
//   const { dispatch, usersDB } = useAuthContext();
  const router = useRouter();


  
  //Toggles the password view from hidden to seen for the user
//   const setPasswordView = computed(
//     () => {
//     passwordType.value = passwordType.value === "password" ? "text" : "password"
//     console.log(passwordType.value)
//     return passwordType
//   } 
//   )

//     const togglePasswordView = () => {
//     passwordType.value = passwordType.value === "password" ? "text" : "password"
//     console.log(passwordType.value)
//   } 


   //Validates user and makes login requests
  const handleSubmit = () => {
    console.log(userLogin)
    // const authenticate = usersDB?.find(
    //   (user) => user.email === userLogin.email
    // );

    // if (authenticate) {
    //   if (authenticate.password === userLogin.password) {
    //     dispatch({ type: "USER_LOGGED_IN", payload: userLogin });
    //     navigate("/dashboard");
    //   } else {
    //     setUserLoginErrors({ ...userLoginErrors, password: true });
    //   }
    // } else {
    //   setUserLoginErrors({ ...userLoginErrors, email: true });
    // }
    router.push("/dashboard");
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
            <h1 className="text-[1.7rem] xl:text-[2rem] text-[#000000d5] font-semibold">
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
                  <span :className="`text-red-600 ${userLoginErrors.email ? 'block' : 'hidden'}`">
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
                    <!-- :type="setPasswordView.value" -->
                    <input
                      
                      type="password"
                      name="password"
                      v-model="userLogin.password"
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                      required
                    />
                    <button
                      className="absolute right-3 top-[0.62rem] outline-none"
                      @click="togglePasswordView "type="button"
                    >
                      {{passwordType === "password" ? "Cp" :  "Op"}}
                    </button>
                  </div>
                  <span :className="`text-red-600 ${userLoginErrors.password ? 'block' : 'hidden'}`">
                    Incorrect password
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <!-- <input
                    type="checkbox"
                    checked={userLogin.keepLoggedIn}
                    onChange={(e) =>
                      setUserLogin({
                        ...userLogin,
                        keepLoggedIn: e.currentTarget.checked,
                      })
                    }
                    name="keep-logged-in"
                    id="keep-logged-in"
                  /> -->
                  <label htmlFor="terms" className="text-lg md:font-medium">
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