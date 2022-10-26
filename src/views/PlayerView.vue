<template>
  <main class="w-screen flex items-center justify-center">
    <CircularLoading v-if="isLoading" />

    <div v-else class="mt-10 flex flex-col items-center justify-center gap-2">
      <img
        :src="player?.currentTeam.crest"
        :alt="player?.name"
        width="200"
        height="200"
      />
      <h1 class="text-3xl font-bold mb-4">{{ player?.name }}</h1>
      <p class="text-sm px-2">{{ player?.position }}</p>
      <p class="text-sm px-2">{{ player?.nationality }}</p>
      <p class="text-sm px-2">{{ player?.shirtNumber }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import CircularLoading from "@/components/CircularLoading.vue";
import { fetchService } from "@/services";
import type { Player } from "@/types";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const id = ref(useRoute().params?.id as string);

const isLoading = ref(true);
const player = ref<Player | null>(null);

const getTeamDetail = async (playerId: string) => {
  isLoading.value = true;
  try {
    const data = await fetchService({ path: `persons/${playerId}` });
    player.value = data;
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};

watch(id, () => {
  getTeamDetail(id.value);
});

onMounted(() => {
  getTeamDetail(id.value);
});
</script>
