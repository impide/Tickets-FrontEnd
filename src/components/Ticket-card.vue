<template>
  <a
    href="#"
    class="relative block min-w-72 min-h-40 md:min-w-60 lg:min-w-80 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="w-full bg-[#1C64F2] rounded-t-lg box-shadow">
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

    <p class="text-lg px-2 text-gray-700 text-justify dark:text-gray-400">
      {{ description }}
    </p>
  </a>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
export default {
  name: "TicketCard",
  components: {
    Icon,
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
  },
};
</script>

<style scoped>
.box-shadow {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
