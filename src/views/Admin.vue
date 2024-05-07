<template>
  <div
    class="md:ml-64 text-4xl text-center flex flex-col gap-6 items-center text-blue-700 font-semibold pt-10"
  >
    <h2>Admin</h2>
    <div class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pt-8 px-6">
      <TicketAdminCard
        v-for="(ticket, index) in tickets"
        :key="index"
        :title="ticket.title"
        :description="ticket.description"
        :statue="ticket.status"
        :username="ticket.user.username"
        :response="ticket.response"
        :createdAt="ticket.createdAt"
        :id="ticket.id"
      />
    </div>
  </div>
</template>

<script>
import TicketAdminCard from "@/components/Ticket-admin.vue";
import { onMounted, ref } from "vue";

export default {
  name: "Admin",
  components: {
    TicketAdminCard,
  },
  setup() {
    const tickets = ref([]);
    onMounted(async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_HOST}/tickets/allTickets`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        tickets.value = await response.json();
      } catch (error) {
        console.error(error);
      }
    });
    return { tickets };
  },
};
</script>

<style scoped></style>
