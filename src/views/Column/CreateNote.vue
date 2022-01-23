<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "~/store/content";

// props
const { columnId, setNewNoteState } = defineProps<{
  columnId: string;
  setNewNoteState: () => void;
}>();

// global store
const store = useStore();

// noteContent
const noteContent = ref("");
const confirmAction = () => {
  store.newNote(columnId, noteContent.value);
  noteContent.value = "";
};
</script>

<template>
  <div class="mb-4 transition-all text-sm">
    <textarea
      required
      class="w-full h-20 mb-2 p-2 rounded-md border border-slate-300 placeholder:text-slate-500 focus:outline-0 focus:border-blue-700 focus:ring"
      placeholder="Enter a note"
      v-model="noteContent"
    ></textarea>
    <div class="flex justify-between items-center space-x-3">
      <button
        :disabled="!Boolean(noteContent.length)"
        @click="confirmAction"
        class="w-1/2 h-8 rounded-md bg-green-600 disabled:bg-green-600/50 text-white transition-all"
      >
        Add
      </button>
      <button
        @click="setNewNoteState"
        class="w-1/2 h-8 rounded-md bg-gray-100 border border-slate-300"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
