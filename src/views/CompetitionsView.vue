<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Competition"
      name="area"
      v-model="area"
      class="mb-6 rounded-md px-2 py-1 text-black placeholder:text-black placeholder:opacity-75 placeholder:text-xs text-xs"
    />

    <CircularLoading v-if="isLoading" />

    <ItemsCard
      v-else-if="!isLoading && competitions.length > 0"
      :data="competitions"
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
const competitions = ref<Competition[]>([]);

const getCompetitions = async (areaId: string) => {
  isLoading.value = true;
  try {
    const data = await fetchService({
      path: "competitions",
      query: { areas: areaId },
    });
    competitions.value = data?.competitions;
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};

const area = ref("");

watch(area, () => {
  if (area.value != "") {
    competitions.value = competitions.value.filter((c) =>
      c.name.toLowerCase().includes(area.value.toLowerCase())
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
