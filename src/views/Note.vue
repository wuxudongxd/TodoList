<script setup lang="ts">
import { ref, toRefs } from "vue";
import useDrag from "../hooks/useDrag";

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
    class="h-20 w-full bg-white p-3 mb-2 rounded-md border border-gray-300 cursor-move hover:shadow focus:ring focus:ring-blue-200 focus:border-blue-600">
    <div>{{ content }}</div>
  </div>
</template>
