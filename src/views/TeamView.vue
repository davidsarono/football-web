<template>
  <main class="flex flex-col items-center gap-8 px-2 w-full">
    <CircularLoading v-if="isLoading" />

    <div
      v-else-if="!isLoading && team != null"
      class="flex flex-col md:flex-row gap-8"
    >
      <div
        class="w-full flex flex-col items-center md:justify-center md:w-[750px]"
      >
        <img :src="team?.crest" :alt="team?.name" width="200" height="200" />
        <h1 class="text-3xl font-bold mb-4">{{ team?.name }}</h1>

        <div class="w-full flex flex-col md:items-center">
          <h2 class="text-xl font-semibold text-left mb-2">Detail</h2>
          <div class="grid grid-cols-2">
            <p class="text-sm px-2 font-bold">Founded</p>
            <p class="text-sm px-2">{{ team?.founded }}</p>
            <p class="text-sm px-2 font-bold">Venue</p>
            <p class="text-sm px-2">{{ team?.venue }}</p>
            <p class="text-sm px-2 font-bold">Coach</p>
            <p class="text-sm px-2">{{ team?.coach.name }}</p>
          </div>
        </div>
      </div>

      <div class="w-full">
        <h2 class="text-xl font-semibold text-left mb-2">Players</h2>
        <ul class="px-2 md:px-0 flex flex-col md:flex-row md:flex-wrap gap-2">
          <li
            v-for="player in team?.squad"
            :key="player.id"
            class="flex flex-col gap-1 rounded-2xl p-[10px] bg-dark-grey-gradient"
          >
            <RouterLink :to="`/player/${player?.id}`">
              <div class="flex justify-between items-center">
                <p class="px-2 font-bold">{{ player.name }}</p>
                <p
                  class="text-xs font-semibold inline-block py-1 px-2 rounded-full uppercase last:mr-0 mr-1"
                  :style="
                    getLabelBackgroundByPosition(
                      player?.position?.toUpperCase()
                    )
                  "
                >
                  {{ player.position }}
                </p>
              </div>
              <p class="text-sm pl-4">{{ player.nationality }}</p>
              <p class="text-sm pl-4">{{ player.dateOfBirth }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import CircularLoading from "@/components/CircularLoading.vue";
import { fetchService } from "@/services";
import type { Team } from "@/types";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const id = ref(useRoute().params?.id as string);

const getLabelBackgroundByPosition = (position: string) => {
  switch (position) {
    case "GOALKEEPER":
      return { color: "#2563EB", backgroundColor: "#BFDBFE" };

    case "DEFENCE":
      return { color: "#DB2777", backgroundColor: "#FBCFE8" };

    case "MIDFIELD":
      return { color: "#16A34A", backgroundColor: "#BBF7D0" };

    case "OFFENCE":
    default:
      return { color: "#FEF08A", backgroundColor: "#ca8a04" };
  }
};

const isLoading = ref(true);
const team = ref<Team | null>(null);

const getTeamDetail = async (teamId: string) => {
  isLoading.value = true;
  try {
    const data = await fetchService({ path: `teams/${teamId}` });
    team.value = data;
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
