<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Team"
      name="team"
      v-model="team"
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

    <div
      v-else-if="!isLoading && teams.length > 0"
      class="flex flex-wrap gap-2 items-center justify-center"
    >
      <RouterLink
        v-for="team in teams"
        :key="team?.id"
        :to="`/team/${team?.id}`"
        class="flex flex-col gap-1 h-[150px] w-[100px] rounded-2xl p-[10px] bg-dark-grey-gradient"
      >
        <img
          :src="
            team?.crest ??
            'data:image/jpg;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
          "
          :alt="team?.name"
          class="aspect-square object-center rounded-2xl w-full"
        />
        <p class="text-center truncate">{{ team?.name }}</p>
      </RouterLink>
    </div>

    <p v-else>No Data...</p>
  </main>
</template>

<script setup lang="ts">
import { fetchService } from "@/services";
import type { Team } from "@/types";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const id = ref(useRoute().params?.id as string);

const isLoading = ref(true);
const teams = ref<Team[]>([]);

const getTeams = async () => {
  isLoading.value = true;
  const data = await fetchService({
    path: `competitions/${id.value}/teams`,
  });
  teams.value = data.teams;
  isLoading.value = false;
};

const team = ref("");

watch(team, () => {
  if (team.value != "") {
    teams.value = teams.value.filter((a) =>
      a.name.toLowerCase().includes(team.value.toLowerCase())
    );
  } else {
    getTeams();
  }
});

watch(id, () => {
  getTeams();
});

onMounted(() => {
  getTeams();
});
</script>
