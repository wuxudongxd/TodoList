<script setup lang="ts">
import { computed, ref, toRef, toRefs } from "vue";
import useDrop from "Hooks/useDrop";
import Note from "../Note.vue";
import Header from "Views/Column/Header.vue";

// props
const { column } = defineProps<{ column: Column }>();
const { id: columnId, name, notes } = toRefs(column);
const count = computed(() => notes.value.length);
const setColName = (newName: string) => {
  column.name = newName;
};

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
    <Header
      :column-id="columnId"
      :name="name"
      :count="count"
      :set-col-name="setColName"
    ></Header>
    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :column-id="columnId"
    ></Note>
  </div>
</template>
