<template>
  <div class="flex flex-wrap gap-2 items-center justify-center">
    <RouterLink
      v-for="item in props.data"
      :key="item?.id"
      :to="to(item)"
      class="w-[100px] h-[175px]"
    >
      <div
        class="flex flex-col items-center gap-2 h-[100px] w-[100px] rounded-full p-[10px] bg-dark-grey-gradient"
      >
        <img
          v-lazy="
            item?.[imgSrc] ??
            'data:image/jpg;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
          "
          :alt="item?.[text]"
          width=""
          class="aspect-square object-center rounded-full w-full"
        />
      </div>
      <p class="text-center text-xs mt-4">{{ item?.[text] }}</p>
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
