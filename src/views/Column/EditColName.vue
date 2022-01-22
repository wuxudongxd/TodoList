<script setup lang="ts">
import { ref } from "vue";

// show menu
const menuState = ref(false);
const menuOption = ref<"" | "edit" | "delete">("");
</script>

<template>
  <div class="relative">
    <div
      class="mb-4 text-2xl ml-3 cursor-pointer hover:text-blue-500"
      @click="menuState = true"
    >
      ...
    </div>
    <div v-if="menuState" class="absolute top-10 -right-2">
      <div class="triangle"></div>
      <div
        class="text-sm border border-gray-200 rounded-md overflow-hidden bg-white py-1"
      >
        <div
          class="w-44 h-8 flex items-center pl-4 cursor-pointer bg-white border-b border-gray-200 hover:bg-[#0969da] hover:text-white transition-all"
        >
          Edit column
        </div>
        <div
          class="w-44 h-8 flex items-center pl-4 cursor-pointer bg-white hover:bg-[#0969da] hover:text-white transition-all"
        >
          Delete column
        </div>
      </div>
    </div>
  </div>

  <div v-if="menuOption === 'edit'"></div>
  <div v-if="menuOption === 'delete'"></div>
</template>

<style lang="scss">
.triangle {
  &::before {
    content: "";
    position: absolute;
    top: -16px;
    right: 9px;
    border-width: 8px;
    border-color: transparent transparent #e5e7eb transparent;
  }
  &::after {
    content: "";
    position: absolute;
    top: -13px;
    right: 10px;
    border-width: 7px;
    border-color: transparent transparent #fff transparent;
  }
}
</style>
