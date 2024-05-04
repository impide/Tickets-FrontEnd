<template>
  <div class="md:ml-64 text-4xl text-center text-blue-700 font-semibold pt-10">
    <h2 class="px-3">Créer un ticket</h2>
    <Ticket />
  </div>
</template>

<script>
import Ticket from "@/components/Ticket.vue";
export default {
  name: "CreateTicket",
  components: {
    Ticket,
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
