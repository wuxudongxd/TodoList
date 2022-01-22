<script setup lang="ts">
import { ref } from "vue";

// show menu
const menuState = ref(false);
</script>

<template>
  <div class="relative">
    <div
      class="mb-4 text-2xl ml-3 cursor-pointer hover:text-blue-500"
      @click="menuState = true"
    >
      ...
    </div>
    <div v-if="menuState" class="absolute top-10 left-0">111</div>
  </div>
</template>
