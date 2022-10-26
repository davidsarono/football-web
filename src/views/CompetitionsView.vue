<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Competition"
      name="area"
      v-model="area"
      class="mb-4 rounded-sm px-2 text-black placeholder:text-black placeholder:opacity-75"
    />

    <CircularLoading v-if="isLoading" />

    <div
      v-else-if="!isLoading && areas.length > 0"
      class="flex flex-wrap gap-2 items-center justify-center"
    >
      <RouterLink
        v-for="area in areas"
        :key="area?.id"
        :to="`/teams/${area?.code}`"
        class="flex flex-col gap-1 h-[150px] w-[100px] rounded-2xl p-[10px] bg-dark-grey-gradient"
      >
        <img
          :src="
            area?.emblem ??
            'data:image/jpg;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
          "
          :alt="area?.name"
          class="aspect-square object-center rounded-2xl w-full"
        />
        <p class="text-center truncate">{{ area?.name }}</p>
      </RouterLink>
    </div>

    <p v-else>No Data...</p>
  </main>
</template>

<script setup lang="ts">
import CircularLoading from "@/components/CircularLoading.vue";
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
</script>
