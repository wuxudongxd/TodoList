<script setup lang="ts">
import { ref } from "vue";
import Modal from "~/components/Modal.vue";
import { useStore } from "~/store/content";

// props
const { note, columnId } = defineProps<{ note: Note; columnId: string }>();

// store
const store = useStore();

// show menu
const menuRef = ref<HTMLElement | null>(null);
const openMenuRef = ref<HTMLElement | null>(null);
const menuState = ref(false);
const clickHandler = (e: Event) => {
  if (
    !menuRef.value?.contains(e.target as HTMLElement) &&
    !openMenuRef.value?.contains(e.target as HTMLElement)
  ) {
    menuState.value = false;
    document.removeEventListener("click", clickHandler);
  }
};
const showMenu = () => {
  menuState.value = true;
  document.addEventListener("click", clickHandler);
};

// edit and delete note
const editModalState = ref(false);
const closeEditModal = () => {
  editModalState.value = false;
};
const newContent = ref(note.content);
const updateContent = () => {
  store.setNoteContent(columnId, note.id, newContent.value);
  closeEditModal();
};
const deleteNote = () => {
  if (confirm("This will remove this note from the project")) {
    store.delNote(columnId, note.id);
  }
};
</script>

<template>
  <div>
    <div
      ref="openMenuRef"
      class="absolute top-0 right-1 flex justify-center items-center cursor-pointer w-8 h-6 text-xl hover:text-blue-600"
      @click="showMenu"
    >
      ...
    </div>
    <div v-if="menuState" ref="menuRef" class="absolute top-8 right-1 z-10">
      <div class="triangle"></div>
      <div
        class="text-sm border border-gray-300 rounded-md overflow-hidden bg-white py-1"
      >
        <div
          @click="editModalState = true"
          class="w-44 h-8 flex items-center pl-4 cursor-pointer bg-white border-b border-gray-300 hover:bg-[#0969da] hover:text-white transition-all"
        >
          Edit note
        </div>
        <div
          @click="deleteNote"
          class="w-44 h-8 flex items-center pl-4 cursor-pointer bg-white hover:bg-[#0969da] hover:text-white transition-all"
        >
          Delete note
        </div>
      </div>
    </div>
  </div>

  <Modal
    :modal-state="editModalState"
    modal-title="Edit note"
    :close-modal="closeEditModal"
  >
    <div class="min-h-[15rem] w-full p-5">
      <div>Note</div>
      <textarea
        class="min-h-[6rem] w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-0 focus:border-blue-500 focus:ring focus:bg-white"
        v-model="newContent"
      ></textarea>
      <button
        @click="updateContent"
        class="w-32 h-8 mt-8 text-white border border-gray-300 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 transition-all"
      >
        Save note
      </button>
    </div>
  </Modal>
</template>
