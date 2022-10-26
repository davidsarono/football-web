<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Area"
      name="area"
      v-model="area"
      class="mb-4 rounded-sm px-2 text-black placeholder:text-black placeholder:opacity-75"
    />

    <CircularLoading v-if="isLoading" />

    <ItemsCard
      v-else
      :data="areas"
      :to="getToPath"
      img-src="flag"
      text="name"
    />
  </main>
</template>

<script setup lang="ts">
import CircularLoading from "@/components/CircularLoading.vue";
import ItemsCard from "@/components/ItemsCard.vue";
import { fetchService } from "@/services";
import type { Area } from "@/types";
import { onMounted, ref, watch } from "vue";

const isLoading = ref(true);
const areas = ref<Area[]>([]);

const getAreas = async () => {
  isLoading.value = true;
  try {
    const data = await fetchService({ path: "areas" });
    areas.value = data.areas?.filter((a: Area) => a?.flag);
  } catch (error) {
    console.log(error);
  }
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

const getToPath = (params: Area) => `/competitions/${params?.id}`;
</script>
