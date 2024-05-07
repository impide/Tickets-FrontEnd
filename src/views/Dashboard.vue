<template>
  <div>
    <section
      class="md:flex-row items-center gap-5 md:justify-center bg-gradient-to-bl from-[#c6cbff] to-white min-h-screen"
    >
      <Sidebar />
      <router-view></router-view>
    </section>
  </div>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
  setup() {
    const message = ref("You are not logged in.");
    const store = useStore();
    const userId = localStorage.getItem("userId");

    onMounted(async () => {
      try {
        const responseUser = await fetch(
          `${process.env.VUE_APP_HOST}/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!responseUser.ok) {
          throw new Error("HTTP error " + responseUser.status);
        }
        const content = await responseUser.json();
        const user = content.user;

        message.value = `hello ${user.username}`;

        await store.dispatch("setAuth", true);
      } catch (error) {
        await store.dispatch("setAuth", false);
      }
    });

    return { message };
  },
};
</script>
