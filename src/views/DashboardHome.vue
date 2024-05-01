<template>
  <div class="md:ml-64 text-4xl text-center text-blue-700 font-semibold pt-10">
    <h2 class="px-3">{{ message }}</h2>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "DashboardHome",
  setup() {
    const message = ref("You are not logged in.");
    const userId = localStorage.getItem("userId");

    onMounted(async () => {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const content = await response.json();
      const user = content.user;

      message.value = `Bienvenue sur ton tableau de bord ${user.username}`;
    });

    return { message };
  },
};
</script>

<style scoped></style>
