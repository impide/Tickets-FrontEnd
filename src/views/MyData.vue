<template>
  <div
    class="md:ml-64 text-4xl text-center flex flex-col gap-6 items-center text-blue-700 font-semibold pt-10"
  >
    <h2 class="px-3">Mes données</h2>
    <div
      class="w-full md:w-11/12 bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
              >Ton nom d'utilisateur</label
            >
            <div class="flex items-center">
              <input
                v-model="data.username"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="12ddzd1"
              />
              <button
                type="submit"
                class="ml-2 p-2 text-lg px-3 bg-blue-500 text-white rounded"
              >
                Modifier
              </button>
            </div>
            <p v-if="errors.username" class="text-red-500 text-lg text-justify">
              {{ errors.username }}
            </p>
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm text-start font-medium text-gray-900 dark:text-white"
              >Ton email</label
            >
            <input
              v-model="data.email"
              type="email"
              name="email"
              id="email"
              readonly
              placeholder="name@company.com"
              class="bg-gray-50 border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import UserSchema from "@/validations/userValidation";
import { z } from "zod";
import { toast } from "vue3-toastify";

export default {
  name: "MyData",
  setup() {
    const errors = ref({});
    const data = ref({ username: "", email: "" });
    const userId = localStorage.getItem("userId");
    onMounted(async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_HOST}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const userData = await response.json();

        data.value.username = userData.user.username;
        data.value.email = userData.user.email;
      } catch (error) {
        console.error(error);
      }
    });
    const submit = async () => {
      try {
        const validatedData = UserSchema.parse(data.value);

        await fetch(`${process.env.VUE_APP_HOST}/users/${userId}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(validatedData),
          credentials: "include",
        });

        toast.success("Données modifiées avec succès");
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors.value = error.errors.reduce((prev, curr) => {
            return { ...prev, [curr.path[0]]: curr.message };
          }, {});
        } else {
          console.error(error);
        }
      }
    };

    return { data, submit, errors };
  },
};
</script>

<style scoped></style>
