<template>
  <div class="md:ml-64 text-4xl text-center text-blue-700 font-semibold pt-10">
    <h2 class="px-3">Mes tickets</h2>
    <div class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pt-8 px-6">
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :title="ticket.title"
        :description="ticket.description"
        :statue="ticket.status"
      />
    </div>
  </div>
</template>

<script>
import TicketCard from "@/components/Ticket-card.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
export default {
  name: "MyTickets",
  components: {
    TicketCard,
  },
  setup() {
    const route = useRoute();
    const tickets = ref([]);
    onMounted(async () => {
      if (route.query.created) {
        toast.success("Votre ticket a été créé avec succès");
      }
      try {
        const response = await fetch(`${process.env.VUE_APP_HOST}/tickets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

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
