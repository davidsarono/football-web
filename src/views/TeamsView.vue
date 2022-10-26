<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Team"
      name="team"
      v-model="team"
      class="mb-4 rounded-sm px-2 text-black placeholder:text-black placeholder:opacity-75"
    />

    <CircularLoading v-if="isLoading" />

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
import CircularLoading from "@/components/CircularLoading.vue";
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
