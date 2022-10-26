<template>
  <div class="flex flex-wrap gap-2 items-center justify-center">
    <RouterLink
      v-for="item in props.data"
      :key="item?.id"
      :to="to(item)"
      class="flex flex-col items-center gap-2 h-[150px] w-[100px] rounded-2xl p-[10px] bg-dark-grey-gradient"
    >
      <img
        :src="
          item?.[imgSrc] ??
          'data:image/jpg;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
        "
        :alt="item?.[text]"
        class="aspect-square object-center rounded-2xl w-full"
      />
      <p class="text-center text-xs">{{ item?.[text] }}</p>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: any[];
  to: (params: any) => string;
  imgSrc: string;
  text: string;
}>();
</script>
