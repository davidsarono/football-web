<template>
  <main class="flex flex-col items-center gap-8 px-2 w-full">
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

    <div
      v-if="!isLoading && team != null"
      class="flex flex-col md:flex-row gap-8"
    >
      <div
        class="w-full flex flex-col items-center md:justify-center md:w-[750px]"
      >
        <img :src="team?.crest" :alt="team?.name" width="200" height="200" />
        <h1 class="text-3xl font-bold mb-4">{{ team?.name }}</h1>

        <div class="w-full flex flex-col items-center">
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
  const data = await fetchService({ path: `teams/${teamId}` });
  team.value = data;
  isLoading.value = false;
};

watch(id, () => {
  getTeamDetail(id.value);
});

onMounted(() => {
  getTeamDetail(id.value);
});
</script>
