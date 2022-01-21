<script setup lang="ts">
import { computed, inject, ref, toRefs } from "vue";
import useDrop from "../hooks/useDrop";
import Note from "./Note.vue";
import { storeFnSymbol } from "../store/content";

// props
const { column, columnIndex } =
  defineProps<{ column: Column; columnIndex: number }>();
const { name, notes } = toRefs(column);
const count = computed(() => notes.value.length);

// inject - to get content function
const { newNote } = inject(storeFnSymbol) as { newNote: Function };

// drop Hook
const columnRef = ref<HTMLElement | null>(null);
useDrop(columnRef, { columnIndex });

// add new note
const newNoteState = ref(false);
const changeNoteState = () => {
  newNoteState.value = !newNoteState.value;
};
const noteContent = ref("");
const confirmAction = () => {
  newNote(columnIndex, noteContent.value);
  noteContent.value = "";
};
</script>

<template>
  <div
    ref="columnRef"
    tabindex="0"
    class="flex-none w-80 h-full px-2 overflow-auto rounded-md bg-[#f6f8fa] border border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-600">
    <div class="w-full h-10 mb-4 px-2 flex justify-between items-center">
      <div class="text-sm">{{ count }}---{{ name }}</div>
      <div @click="changeNoteState" class="cursor-pointer hover:text-blue-500">
        十
      </div>
    </div>
    <div v-if="newNoteState" class="mb-4 transition-all text-sm">
      <textarea
        required
        class="w-full h-20 mb-2 p-2 rounded-md border border-slate-300 placeholder:text-slate-500 focus:outline-0 focus:border-blue-700 focus:ring"
        placeholder="Enter a note"
        v-model="noteContent"></textarea>
      <div class="flex justify-between items-center space-x-3">
        <button
          :disabled="!Boolean(noteContent.length)"
          @click="confirmAction"
          class="w-1/2 h-8 rounded-md bg-green-600 disabled:bg-green-600/50 text-white transition-all">
          Add
        </button>
        <button
          @click="newNoteState = false"
          class="w-1/2 h-8 rounded-md bg-gray-100 border border-slate-300">
          Cancel
        </button>
      </div>
    </div>
    <Note
      v-for="(note, index) in notes"
      :key="note.id"
      :note="note"
      :note-index="index"
      :column-index="columnIndex"></Note>
  </div>
</template>
