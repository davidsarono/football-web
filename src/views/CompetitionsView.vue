<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Competition"
      name="area"
      v-model="area"
      class="mb-4 rounded-sm px-2 text-black placeholder:text-black placeholder:opacity-75"
    />

    <CircularLoading v-if="isLoading" />

    <ItemsCard
      v-else-if="!isLoading && areas.length > 0"
      :data="areas"
      :to="getToPath"
      img-src="emblem"
      text="name"
    />

    <p v-else>No Data...</p>
  </main>
</template>

<script setup lang="ts">
import CircularLoading from "@/components/CircularLoading.vue";
import ItemsCard from "@/components/ItemsCard.vue";
import { fetchService } from "@/services";
import type { Competition } from "@/types";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const id = ref(useRoute().params?.id as string);

const isLoading = ref(true);
const areas = ref<Competition[]>([]);

const getCompetitions = async (areaId: string) => {
  isLoading.value = true;
  const data = await fetchService({
    path: "competitions",
    query: { areas: areaId },
  });
  areas.value = data?.competitions;
  isLoading.value = false;
};

const area = ref("");

watch(area, () => {
  if (area.value != "") {
    areas.value = areas.value.filter((a) =>
      a.name.toLowerCase().includes(area.value.toLowerCase())
    );
  } else {
    getCompetitions(id.value);
  }
});

watch(id, () => {
  getCompetitions(id.value);
});

onMounted(() => {
  getCompetitions(id.value);
});

const getToPath = (params: Competition) => `/teams/${params?.code}`;
</script>
