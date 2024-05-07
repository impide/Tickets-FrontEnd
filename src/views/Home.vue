<style scoped>
.section-fullscreen {
  min-height: calc(100vh - 72px);
}
@media (min-width: 768px) {
  .section-fullscreen {
    min-height: calc(100vh - 56px);
  }
}
</style>
<template>
  <section
    class="flex flex-col md:flex-row items-center gap-5 md:justify-center bg-gradient-to-bl from-[#c6cbff] to-white section-fullscreen"
  >
    <div class="mt-4 w-4/5 md:w-2/5 flex flex-col gap-2">
      <h2 class="text-5xl text-gray-950 mb-3">
        Bienvenue sur notre site de
        <span class="text-blue-700">gestion de tâches</span>
      </h2>
      <p class="text-xl">
        Ici, vous pouvez facilement créer des tickets, les suivre et les
        supprimer une fois résolus.
      </p>
      <p class="text-xl">
        Pour commencer, créez un ticket en cliquant sur le bouton 'Nouveau
        ticket'. Une fois le ticket créé, il sera visible par l'administrateur
        qui pourra le valider.
      </p>
      <p class="text-xl">
        Prêt à commencer ?
        <router-link to="/login" class="text-blue-700 font-medium"
          >Connectez-vous</router-link
        >
        ou
        <router-link to="/register" class="text-blue-700 font-medium"
          >créez un compte</router-link
        >
        pour commencer à gérer vos tickets.
      </p>
    </div>
    <div>
      <img
        src="@/assets/images/tickets-svgrepo-com.svg"
        alt="Illustration de ticket"
        class="w-96 m-auto"
      />
    </div>
  </section>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>
