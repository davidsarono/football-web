<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Area"
      name="area"
      v-model="area"
      class="mb-4 rounded-sm px-2 text-black placeholder:text-black placeholder:opacity-75"
    />

    <CircularLoading v-if="isLoading" />

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
import CircularLoading from "@/components/CircularLoading.vue";
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
