<template>
  <Nav/>
  <main>
    <router-view/>
  </main>
  
</template>


<script>

import Nav from "./components/Nav";

export default {
  components: {
    Nav
  },
}
</script>


<style>
</style>
