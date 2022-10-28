<template>
  <main
    class="h-[calc(100vh-5rem)] w-full flex flex-col justify-center items-center"
  >
    <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
    <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <RouterLink
      to="/"
      class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring mt-5"
    >
      <div
        class="absolute inline-block inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
      ></div>

      <span class="relative block px-8 py-3 bg-[#282828] border border-current">
        Go Home
      </span>
    </RouterLink>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
