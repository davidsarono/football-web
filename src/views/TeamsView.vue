<template>
  <main class="flex flex-col items-center gap-1">
    <input
      placeholder="Search Team"
      name="team"
      v-model="team"
      class="mb-6 rounded-md px-2 py-1 text-black placeholder:text-black placeholder:opacity-75 placeholder:text-xs text-xs"
    />

    <CircularLoading v-if="isLoading" />

    <ItemsCard
      v-else-if="!isLoading && teams.length > 0"
      :data="teams"
      :to="getToPath"
      img-src="crest"
      text="name"
    />

    <p v-else>No Data...</p>
  </main>
</template>

<script setup lang="ts">
import CircularLoading from "@/components/CircularLoading.vue";
import ItemsCard from "@/components/ItemsCard.vue";
import { fetchService } from "@/services";
import type { Team } from "@/types";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const id = ref(useRoute().params?.id as string);

const isLoading = ref(true);
const teams = ref<Team[]>([]);

const getTeams = async () => {
  isLoading.value = true;
  try {
    const data = await fetchService({
      path: `competitions/${id.value}/teams`,
    });
    teams.value = data.teams;
  } catch (error) {
    console.log(error);
  }
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

const getToPath = (params: Team) => `/team/${params?.id}`;
</script>
