<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Area"
      name="area"
      v-model="area"
      class="mb-4 rounded-sm px-2 text-black placeholder:text-black placeholder:opacity-75"
    />
    <div
      v-if="isLoading"
      class="inline-flex items-center transition ease-in-out duration-150"
    >
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div class="flex flex-wrap gap-2 items-center justify-center">
      <RouterLink
        v-for="area in areas"
        :key="area?.id"
        :to="`/competitions/${area?.id}`"
        class="flex flex-col gap-1 h-[150px] w-[100px] rounded-2xl p-[10px] bg-dark-grey-gradient"
      >
        <img
          :src="
            area?.flag ??
            'data:image/jpg;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
          "
          :alt="area?.name"
          class="aspect-square object-center w-full"
        />
        <p class="text-center truncate">{{ area?.name }}</p>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { fetchService } from "@/services";
import type { Area } from "@/types";
import { onMounted, ref, watch } from "vue";

const isLoading = ref(true);
const areas = ref<Area[]>([]);

const getAreas = async () => {
  isLoading.value = true;
  const data = await fetchService({ path: "areas" });
  areas.value = data.areas?.filter((a: Area) => a?.flag);
  isLoading.value = false;
};

const area = ref("");

watch(area, () => {
  if (area.value != "") {
    isLoading.value = true;
    areas.value = areas.value.filter((a) =>
      a.name.toLowerCase().includes(area.value.toLowerCase())
    );
    isLoading.value = false;
  } else {
    getAreas();
  }
});

onMounted(() => {
  getAreas();
});
</script>
