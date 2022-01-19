<script setup lang="ts">
import { provide } from "vue";
import Column from "./Column.vue";
import { store, storeFnSymbol, storeFn } from "../store/content";

// provide state
provide(storeFnSymbol, storeFn);


</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="h-24 bg-[#f6f8fa] border-b border-gray-300">TODO List</div>
    <div class="h-16">tabBar</div>
    <div class="flex-1 p-4 flex items-center space-x-4 overflow-auto">
      <Column
        v-for="(column, index) in store"
        :key="column.id"
        :column="column"
        :column-index="index"></Column>
      <div
        class="h-28 w-80 flex-none self-start border border-dashed border-[#d0d7de] rounded-md">
        <div
          class="h-full w-full flex justify-center items-center text-[#57606a] text-sm hover:underline cursor-pointer">
          + Add column
        </div>
      </div>
    </div>
  </div>
</template>
