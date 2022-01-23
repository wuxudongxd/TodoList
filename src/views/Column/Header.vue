<script setup lang="ts">
import { ref } from "vue";
import CreateNote from "Views/Column/CreateNote.vue";
import ColMenu from "Views/Column/ColMenu.vue";

// props
const { columnId, name, count, setColName } = defineProps<{
  columnId: string;
  name: string;
  count: number;
  setColName: (newName: string) => void;
}>();

// add new note
const newNoteState = ref(false);
const setNewNoteState = () => {
  newNoteState.value = !newNoteState.value;
};
</script>
<template>
  <div
    class="w-full h-10 mb-4 px-2 text-gray-600 flex justify-between items-center"
  >
    <div class="text-xs font-semibold flex items-center">
      <div
        class="w-5 h-5 bg-gray-200 flex justify-center items-center rounded-full"
      >
        {{ count }}
      </div>
      <div class="ml-2">{{ name }}</div>
    </div>
    <div class="flex items-center">
      <div
        @click="setNewNoteState"
        class="text-xs font-bold cursor-pointer hover:text-blue-500"
      >
        十
      </div>
      <ColMenu
        :name="name"
        :set-col-name="setColName"
        :column-id="columnId"
      ></ColMenu>
    </div>
  </div>

  <CreateNote
    v-if="newNoteState"
    :column-id="columnId"
    :set-new-note-state="setNewNoteState"
  >
  </CreateNote>
</template>
