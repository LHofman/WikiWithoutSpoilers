<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import ProgressSlider from "./components/ProgressSlider/ProgressSlider.vue";
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header> -->

  <ProgressSlider />
  <RouterView />
</template>
