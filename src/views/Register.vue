<script setup>
import { ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import dashboardBG from "../assets/images/illustration-hero.svg";
// import { useAuthContext } from "../context/AuthContext";
import Toast from "../components/form/Toast.vue";
import FormButton from "../components/form/FormButton.vue";
import OnBoardingLayout from "../layouts/OnBoardingLayout.vue";
import { inject } from "vue";

const appStore = inject("appStore");
console.log(appStore);

//Default values for user inputs and error checking
const defaultUser = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  termsAndCondition: false,
};

const defaultUserErrors = {
  firstName: false,
  lastName: false,
  email: false,
  phoneNumber: false,
  password: false,
  confirmPassword: false,
  termsAndCondition: false,
};

const success = ref(false);
const newUser = reactive(defaultUser);
const showPassword = ref(false);
const newUserErrors = reactive(defaultUserErrors);
//   const { dispatch, usersDB } = useAuthContext();
const passwordView = ref(null);
const router = useRouter();

const NAME_REGEX = /^[a-zA-Z][a-zA-Z]{2,}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^\d{11}$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

//Toggles the password view from hidden to seen for the user
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const validateField = (field) => {
  // submitted.value = false;
  switch (field) {
    case "firstName":
      newUserErrors.firstName = NAME_REGEX.test(newUser.firstName)
        ? null
        : true;
      break;
    case "lastName":
      newUserErrors.lastName = NAME_REGEX.test(newUser.lastName) ? null : true;
      break;
    case "phoneNumber":
      newUserErrors.phoneNumber = PHONE_REGEX.test(newUser.phoneNumber)
        ? null
        : true;
      break;
    case "email":
      newUserErrors.email = newUser.email.trim() ? null : true;
      break;
    case "password":
      newUserErrors.password = PASSWORD_REGEX.test(newUser.password)
        ? null
        : true;
      break;
    case "confirmPassword":
      newUserErrors.confirmPassword =
        newUser.confirmPassword === newUser.password ? null : true;
      break;
    default:
      break;
  }
};

function validateForm() {
  [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "password",
    "confirmPassword",
  ].forEach((field) => {
    validateField(field);
  });

  return (
    !newUserErrors.firstName &&
    !newUserErrors.lastName &&
    !newUserErrors.phoneNumber &&
    !newUserErrors.email &&
    !newUserErrors.password &&
    !newUserErrors.confirmPassword
  );
  return !errors.name && !errors.email && !errors.password && !errors.age;
}

//Validates user inputs and makes sign up requests
const handleSubmit = () => {
  if (validateForm()) {
    const usersDB = appStore.getUsers();
    if (usersDB?.some((users) => users.phoneNumber === newUser.phoneNumber)) {
      alert("Phone number already used");
      return;
    } else if (usersDB?.some((users) => users.email === newUser.email)) {
      alert("Email address already used");
      return;
    } else {
      const user = {};

      for (const key in newUser) {
        user[key] = newUser[key];
      }

      appStore.addUser(user);
      success.value = true;
    }

    // if (isFormValidated) {
    //   dispatch({ type: "ADD_USER", payload: newUser });
    //   setSuccess(true);
    // } else {
    //   return;
    // }

    // Reset
    Object.assign(newUser, {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  } else {
    // focus on the first invalid field
    const el = document.querySelector(`[aria-invalid='true']`);
    if (el) el.focus();
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
            <h1 className="text-[1.7rem] text-[#000000d5] font-semibold">
              Register
            </h1>
            <p className="text-lg text-[#000000d5]">Sign up to get started</p>
          </div>
          <div>
            <form @submit.prevent="handleSubmit">
              <div
                className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6"
              >
                <div className="md:w-[50%]">
                  <label
                    htmlFor="firstName"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                  >
                    First Name:
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    v-model="newUser.firstName"
                    @input="validateField('firstName')"
                    @blur="validateField('firstName')"
                    className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                    required
                  />
                  <span v-if="newUserErrors.firstName" className="text-red-600">
                    Must be more than 2 characters, letters only
                  </span>
                </div>
                <div className="md:w-[50%]">
                  <label
                    htmlFor="lastName"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                  >
                    Last Name:
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    v-model="newUser.lastName"
                    @input="validateField('lastName')"
                    @blur="validateField('lastName')"
                    className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                    required
                  />
                  <span v-if="newUserErrors.lastName" className="text-red-600">
                    Must be more than 2 characters, letters only
                  </span>
                </div>
              </div>
              <div
                className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6"
              >
                <div className="md:w-[50%]">
                  <label
                    htmlFor="phoneNumber"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                  >
                    Phone Number:
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    v-model="newUser.phoneNumber"
                    @input="validateField('phoneNumber')"
                    @blur="validateField('phoneNumber')"
                    className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                    required
                  />
                  <span
                    v-if="newUserErrors.phoneNumber"
                    className="text-red-600"
                  >
                    Phone number must consist of 11 digits
                  </span>
                </div>
                <div className="md:w-[50%]">
                  <label
                    htmlFor="email"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    v-model="newUser.email"
                    @input="validateField('email')"
                    @blur="validateField('email')"
                    className="border border-[#00000093] w-full h-[3.13rem] rounded-lg px-3 outline-none focus:border-2"
                    required
                  />
                  <span v-if="newUserErrors.email" className="text-red-600">
                    Email already used
                  </span>
                </div>
              </div>
              <div
                className="flex flex-col md:flex-row gap-3 md:gap-5 mb-3 md:mb-6"
              >
                <div className="md:w-[50%]">
                  <label
                    htmlFor="password"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      :type="showPassword ? 'text' : 'password'"
                      name="password"
                      v-model="newUser.password"
                      @input="validateField('password')"
                      @blur="validateField('password')"
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 pr-12 outline-none focus:border-2"
                      required
                    />
                    <button
                      className="absolute right-3 top-[0.62rem] outline-none"
                      type="button"
                      @click="toggleShowPassword"
                    >
                      {{ showPassword ? "Cp" : "Op" }}
                      <!-- passwordType === "password" ? <AiFillEye className="text-3xl" /> :  <AiFillEyeInvisible className="text-3xl" /> -->
                    </button>
                  </div>
                  <span v-if="newUserErrors.password" className="text-red-600">
                    Must be more than 8 characters, should include upper and
                    lowercase letters, a number and a special character (!@#$%)
                  </span>
                </div>
                <div className="md:w-[50%]">
                  <label
                    htmlFor="confirmPassword"
                    className="text-lg lg:text-xl font-medium text-[#000000d5] inline-block mb-2"
                  >
                    Confirm Password:
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      :type="showPassword ? 'text' : 'password'"
                      name="confirmPassword"
                      v-model="newUser.confirmPassword"
                      @input="validateField('confirmPassword')"
                      @blur="validateField('confirmPassword')"
                      className="border border-[#00000093] w-full h-[3.13rem] rounded-lg pl-3 12 outline-none focus:border-2"
                      required
                    />
                    <button
                      className="absolute right-3 top-[0.62rem] outline-none"
                      type="button"
                      @click="toggleShowPassword"
                    >
                      {{ showPassword ? "Cp" : "Op" }}
                      <!-- {{passwordType === "password" ? <AiFillEye className="text-3xl" /> :  <AiFillEyeInvisible className="text-3xl" />}} -->
                    </button>
                  </div>
                  <span
                    v-if="newUserErrors.confirmPassword"
                    className="text-red-600"
                  >
                    Must match the password field
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" v-model="newUser.termsAndCondition" />
                  <label htmlFor="terms" className="text-[0.82rem] md:text-lg">
                    <span>I agree to all the </span>
                    <a href="/" className="text-blue-600 font-medium">
                      Terms, Privacy Policy and Conditions
                    </a>
                  </label>
                </div>
                <span
                  v-if="newUserErrors.termsAndCondition"
                  className="text-red-600"
                >
                  Accept Terms, Privacy Policy and Conditions to continue
                </span>
              </div>
              <FormButton label="Create Account" />
              <div className="text-center">
                <p className="text-[1.125rem] text-[#000000d5] font-medium">
                  <span>Already have an account? </span>
                  <RouterLink to="/login" className="text-blue-600">
                    Log in
                  </RouterLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Successful registration overlay  -->
      <Toast
        message="Registered Successfully"
        :closeForm="() => router.push('/login')"
        :success="success"
      />
    </section>
  </OnBoardingLayout>
</template>
