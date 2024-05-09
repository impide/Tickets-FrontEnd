<template>
  <a
    href="#"
    class="relative flex flex-col justify-between items-center min-w-72 h-60 md:min-w-60 lg:min-w-80 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div
      class="w-full h-9 overflow-scroll scrollbar-hide bg-[#1C64F2] rounded-t-lg box-shadow"
    >
      <Icon
        v-if="statue === 'PENDING'"
        class="absolute right-0 top-0"
        icon="mdi:clock-outline"
        style="color: white"
      />
      <Icon
        v-if="statue === 'DONE'"
        class="absolute right-0 top-0"
        icon="material-symbols:done"
        style="color: #1abc35"
      />
      <h5
        class="mb-2 py-1 w-11/12 text-lg overflow-hidden text-center font-medium text-white"
      >
        {{ title }}
      </h5>
    </div>
    <div class="h-36 overflow-scroll scrollbar-hide">
      <p class="text-lg px-2 text-gray-700 text-justify dark:text-gray-400">
        {{ description }}
      </p>
    </div>
    <div class="flex justify-end w-4/5 mb-3">
      <button
        type="button"
        @click="showModal = true"
        class="mt-3 w-full inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Détails
      </button>
    </div>
    <div
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto md:ml-64"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div
          class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-10/12 sm:max-w-lg sm:w-full"
        >
          <div
            class="bg-white px-4 pt-3 pb-4 shadow-lg sm:p-6 sm:pb-4 text-center"
          >
            <h3 class="text-xl">{{ title }}</h3>
          </div>
          <div
            class="bg-gray-50 py-3 px-4 text-lg text-center border border-b-2 flex justify-between"
          >
            <p>{{ formatDate(createdAt) }}</p>
          </div>

          <div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col text-base">
            <div
              class="w-full min-h-20 max-h-40 bg-white rounded-lg border px-2 overflow-scroll scrollbar-hide mb-4"
            >
              <p class="text-gray-700 text-justify">{{ description }}</p>
            </div>
            <div v-if="response !== null || ''">
              <p>La réponse</p>
              <div
                class="w-full min-h-20 max-h-40 bg-white rounded-lg border px-2 overflow-scroll scrollbar-hide mb-4"
              >
                <p class="text-gray-700 text-justify">{{ response }}</p>
              </div>
            </div>

            <div class="flex justify-between">
              <Icon
                v-if="statue === 'PENDING'"
                class="w-10 h-10"
                icon="mdi:clock-outline"
                style="color: #1a56db"
              />
              <Icon
                v-if="statue === 'DONE'"
                class="w-10 h-10"
                icon="material-symbols:done"
                style="color: #1abc35"
              />
              <button
                type="button"
                @click="showModal = false"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { format } from "date-fns";
export default {
  name: "TicketCard",
  components: {
    Icon,
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    statue: {
      type: String,
      required: true,
    },
    response: {
      type: String,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatDate(dateString: string | number | Date) {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy HH:mm:ss");
    },
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
