<script setup lang="ts">
import { ref, toRefs } from "vue";
import useDrag from "~/hooks/useDrag";
import NoteIcon from "~/static/svg/note.svg";
import Menu from "~/views/Note/Menu.vue";

// props
const { note, columnId } = defineProps<{ note: Note; columnId: string }>();
const { content } = toRefs(note);

// drag hook
const noteRef = ref<HTMLElement | null>(null);
useDrag(noteRef, { columnId, noteId: note.id });
</script>

<template>
  <div
    ref="noteRef"
    tabindex="0"
    draggable="true"
    class="min-h-[5rem] w-full text-sm relative flex bg-white p-3 pr-8 mb-2 rounded-md border border-gray-300 cursor-move hover:shadow focus:ring focus:ring-blue-200 focus:border-blue-600"
  >
    <div>
      <NoteIcon />
    </div>
    <div class="ml-2 -mt-[2px] break-all text-gray-700">{{ content }}</div>
    <Menu :note="note" :column-id="columnId"></Menu>
  </div>
</template>
