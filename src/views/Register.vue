<style scoped>
.section-fullscreen {
  min-height: calc(100vh - 72px);
}
@media (min-width: 768px) {
  .section-fullscreen {
    min-height: calc(100vh - 56px);
  }
}
</style>

<template>
  <section class="bg-gradient-to-bl from-[#c6cbff] to-white dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto section-fullscreen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            S'inscrire
          </h1>
          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nom d'utilisateur</label
              >
              <input
                v-model="data.username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="johndoe"
                required=""
              />
              <p v-if="errors.username" class="text-red-500">
                {{ errors.username }}
              </p>
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                v-model="data.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
              <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
              <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Mot de passe</label
              >
              <div class="flex">
                <input
                  v-model="data.password"
                  :type="passwordInputType"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <button @click.prevent="togglePasswordVisibility">
                  <Icon
                    v-if="passwordInputType === 'password'"
                    icon="mdi:show"
                    class="ml-2"
                    width="1.4em"
                    height="1.4em"
                    style="color: black"
                  />
                  <Icon
                    v-else
                    icon="mdi:hide"
                    class="ml-2"
                    width="1.4em"
                    height="1.4em"
                    style="color: black"
                  />
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500">
                {{ errors.password }}
              </p>
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Confirmer le mot de passe</label
              >
              <div class="flex">
                <input
                  v-model="data.confirmPassword"
                  :type="passwordConfirmInputType"
                  name="password"
                  id="check-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <button @click.prevent="togglePasswordConfirmVisibility">
                  <Icon
                    v-if="passwordConfirmInputType === 'password'"
                    icon="mdi:show"
                    class="ml-2"
                    width="1.4em"
                    height="1.4em"
                    style="color: black"
                  />
                  <Icon
                    v-else
                    icon="mdi:hide"
                    class="ml-2"
                    width="1.4em"
                    height="1.4em"
                    style="color: black"
                  />
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-500">
                {{ errors.confirmPassword }}
              </p>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              S'inscrire
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <router-link
                to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Vous avez déjà un compte ? Connecter vous !
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script langu="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import RegisterSchema from "@/validations/registerValidation";
import { z } from "zod";
import "vue3-toastify/dist/index.css";
import store from "@/store";

import { Icon } from "@iconify/vue";

export default {
  name: "Register",
  components: {
    Icon,
  },
  setup() {
    const data = reactive({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const errors = ref({});
    const router = useRouter();
    let errorMessage = ref("");

    let passwordInputType = ref("password");
    const togglePasswordVisibility = () => {
      passwordInputType.value =
        passwordInputType.value === "password" ? "text" : "password";
    };
    let passwordConfirmInputType = ref("password");
    const togglePasswordConfirmVisibility = () => {
      passwordConfirmInputType.value =
        passwordConfirmInputType.value === "password" ? "text" : "password";
    };

    const submit = async () => {
      try {
        const validatedData = RegisterSchema.parse(data);

        const responseSignup = await fetch(
          `${process.env.VUE_APP_HOST}/auth/signup`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(validatedData),
          }
        );
        if (!responseSignup.ok) {
          const error = await responseSignup.json();
          throw error;
        }
        store.dispatch("setToast", true);
        await router.push("/login");
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors.value = error.errors.reduce((prev, curr) => {
            return { ...prev, [curr.path[0]]: curr.message };
          }, {});
        } else {
          errorMessage = errorMessage.value = error.message;
        }
      }
    };
    return {
      passwordConfirmInputType,
      togglePasswordConfirmVisibility,
      passwordInputType,
      togglePasswordVisibility,
      errorMessage,
      data,
      errors,
      submit,
    };
  },
};
</script>
