<template>
  <header>
    <nav
      class="flex items-center justify-center w-full gap-4 h-20 bg-[#00141e] mb-6"
    >
      <RouterLink
        v-for="menu in menus"
        :key="menu.id"
        :to="menu.path"
        class="flex flex-col items-center justify-center relative h-full after:h-1 after:absolute after:right-0 after:left-0 after:bottom-0 hover:font-bold"
        :class="{
          'after:bg-red-700': router.currentRoute.value.path === menu.path,
        }"
        >{{ menu.name }}</RouterLink
      >
    </nav>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from "vue-router";

const router = useRouter();

const menus = [
  {
    id: 0,
    name: "Home",
    path: "/",
  },
  {
    id: 1,
    name: "About",
    path: "/about",
  },
];
</script>

<style>
body {
  @apply bg-[#282828] text-white;
}
</style>
