<template>
  <div
    class="md:ml-64 text-4xl text-center flex flex-col items-center text-blue-700 font-semibold pt-10"
  >
    <h2 class="px-3">Mes tickets</h2>

    <draggable
      v-model="tickets"
      class="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pt-8 px-6"
      group="tickets"
      :itemKey="(item) => item.id"
    >
      <template #item="{ element }">
        <TicketCard
          :title="element.title"
          :description="element.description"
          :statue="element.status"
          :createdAt="element.createdAt"
          :response="element.response"
        />
      </template>
    </draggable>
    <div
      class="fixed bottom-4 flex flex-col sm:flex-row items-center mt-10 w-11/12 md:w-3/5 bg-gradient-to-bl from-[#c6cbff] md:px-3 to-white rounded-lg shadow py-3"
    >
      <draggable
        v-model="trash"
        class="p-10 bg-slate-100 border-dashed border-4 border-sky-500 shadow-lg rounded-lg w-full sm:w-full trash-bin"
        group="tickets"
        :itemKey="'1'"
        @change="removeTicket($event.added.newIndex)"
      >
        <template #item="{ element }"> </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

defineComponent({
  name: "MdiTrashCanOutline",
});
import TicketCard from "@/components/Ticket-card.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import draggable from "vuedraggable";
import store from "@/store";
export default {
  name: "MyTickets",
  components: {
    TicketCard,
    draggable,
  },

  setup() {
    const route = useRoute();
    const tickets = ref([]);
    const trash = ref([]);

    const removeTicket = async (index) => {
      const ticket = trash.value[index];
      if (ticket.status !== "DONE") {
        toast.error("Seuls les tickets cloturés peuvent être supprimés");
        tickets.value.push(ticket);
        trash.value.splice(index, 1);
        return;
      }
      if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce ticket ?")) {
        tickets.value.push(ticket);
        trash.value.splice(index, 1);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.VUE_APP_HOST}/tickets/${ticket.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du ticket");
        }
        console.log("test");

        // await nextTick();
        trash.value.splice(index, 1);
        toast.success("Ticket supprimé avec succès");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la suppression du ticket");
      }
    };
    onMounted(async () => {
      if (store.state.isToast) {
        toast.success("Votre ticket a été créé avec succès");
        store.dispatch("setToast", false);
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

    return { tickets, removeTicket, trash };
  },
};
</script>

<style scoped>
.trash-bin::before {
  content: "Glissez vos tickets cloturés ici pour les supprimer";
  position: absolute;
  width: 80%;
  font-size: 20px;
  color: dimgrey;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
