<template>
  <header>
    <nav class="flex items-center justify-center w-full gap-2 h-20">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/teams">Teams</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
body {
  @apply bg-[#282828] text-white;
}
</style>
