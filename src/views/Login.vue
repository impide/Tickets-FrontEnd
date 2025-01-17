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
            Connecte toi
          </h1>
          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ton email</label
              >
              <input
                v-model="data.email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
              />
              <p v-if="errors.email" class="text-red-500">
                {{ errors.email }}
              </p>
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
                /><button
                  type="button"
                  @click.prevent="togglePasswordVisibility"
                >
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
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Se connecter
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              <router-link
                to="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Vous n'avez pas encore de compte ? Créez-en un maintenant
                !</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import store from "@/store";
import { computed, reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { z } from "zod";
import LoginSchema from "@/validations/loginValidation";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import { Icon } from "@iconify/vue";

export default {
  name: "Login",
  components: {
    Icon,
  },
  setup() {
    const data = reactive({
      email: "",
      password: "",
    });

    let passwordInputType = ref("password");
    const togglePasswordVisibility = () => {
      passwordInputType.value =
        passwordInputType.value === "password" ? "text" : "password";
    };

    const router = useRouter();
    onMounted(() => {
      if (store.state.isToast) {
        toast.success("Vous êtes maintenant inscrit!");
        store.dispatch("setToast", false);
      }
    });
    const errors = ref<{ email?: string; password?: string }>({});
    let errorMessage = ref("");

    const submit = async () => {
      try {
        LoginSchema.parse(data);

        const responseLogin = await fetch(
          `${process.env.VUE_APP_HOST}/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          }
        );
        if (!responseLogin.ok) {
          const error = await responseLogin.json();
          throw error;
        }

        const userData = await responseLogin.json();

        const userRole = userData.user.role;

        if (userRole === "ADMIN") {
          store.commit("SET_ADMIN", true);
        } else {
          store.commit("SET_ADMIN", false);
        }

        const userId = userData.user.id;
        const authToken = userData.token;
        const expiresIn = 60 * 60 * 24 * 1000;
        localStorage.setItem("userId", userId);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem(
          "tokenExpiry",
          (Date.now() + expiresIn).toString()
        );
        store.commit("SET_AUTH", true);

        await router.push("/dashboard");
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors.value = error.errors.reduce((prev, curr) => {
            return { ...prev, [curr.path[0]]: curr.message };
          }, {});
        } else {
          errorMessage.value = (error as Error).message;
          if (Array.isArray(errorMessage.value)) {
            errorMessage.value = errorMessage.value.join(" ");
          }
        }
      }
    };

    return {
      passwordInputType,
      togglePasswordVisibility,
      errorMessage,
      errors,
      data,
      submit,
    };
  },
};
</script>
