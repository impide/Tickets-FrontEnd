<template>
  <div>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Envoyer un ticket
          </h1>
          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <label
                for="title"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ton sujet</label
              >
              <input
                v-model="data.title"
                type="text"
                name="title"
                id="title"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Sujet du ticket"
              />
              <p v-if="errors.title" class="text-red-500 text-lg text-justify">
                {{ errors.title }}
              </p>
            </div>
            <div>
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Descritpion</label
              >
              <textarea
                v-model="data.description"
                name="description"
                id="description"
                rows="4"
                placeholder="Description"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
              <p
                v-if="errors.description"
                class="text-red-500 text-lg text-justify"
              >
                {{ errors.description }}
              </p>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import TicketSchema from "@/validations/ticketValidation";
import { z } from "zod";
import "vue3-toastify/dist/index.css";
import store from "@/store";
export default {
  name: "Ticket",
  setup() {
    const data = reactive({
      title: "",
      description: "",
    });
    const errors = ref({});
    const router = useRouter();

    const submit = async () => {
      try {
        const validatedData = TicketSchema.parse(data);

        await fetch(`${process.env.VUE_APP_HOST}/tickets/createTicket`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(validatedData),
          credentials: "include",
        });
        store.dispatch("setToast", true);
        await router.push("/dashboard/my-tickets");
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
    return {
      data,
      errors,
      submit,
    };
  },
};
</script>

<style scoped>
.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
