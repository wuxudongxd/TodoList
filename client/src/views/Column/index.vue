<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import useDrop from "~/hooks/useDrop";
import Note from "~/views/Note/index.vue";
import Header from "~/views/Column/Header.vue";

// props
const { column } = defineProps<{ column: Column }>();
const { id: columnId, name, notes } = toRefs(column);
const count = computed(() => notes.value.length);

// drop Hook
const columnRef = ref<HTMLElement | null>(null);
useDrop(columnRef, { columnId: columnId.value });
</script>

<template>
  <div
    ref="columnRef"
    tabindex="0"
    class="flex-none w-80 h-full px-2 overflow-auto rounded-md bg-[#f6f8fa] border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-600"
  >
    <Header :column-id="columnId" :name="name" :count="count"></Header>
    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :column-id="columnId"
    ></Note>
  </div>
</template>
