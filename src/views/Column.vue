<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import useDrop from "../hooks/useDrop";
import Note from "./Note.vue";

// props
const { column, columnIndex } =
  defineProps<{ column: Column; columnIndex: number }>();
const { name, notes } = toRefs(column);
const count = computed(() => notes.value.length);

// drop Hook
const columnRef = ref<HTMLElement | null>(null);
useDrop(columnRef, { columnIndex });
</script>

<template>
  <div
    ref="columnRef"
    tabindex="0"
    class="flex-none w-80 h-full px-2 overflow-auto rounded-md bg-[#f6f8fa] border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-600">
    <div class="h-8 mb-4">{{ count }}---{{ name }}</div>
    <Note
      v-for="(note, index) in notes"
      :key="note.id"
      :note="note"
      :note-index="index"
      :column-index="columnIndex"></Note>
  </div>
</template>
