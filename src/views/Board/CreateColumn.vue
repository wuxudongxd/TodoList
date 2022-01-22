<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "Store/content";
import Modal from "Components/Modal.vue";

const store = useStore();

const modalState = ref(false);
const columnName = ref("");
const modalTitle = "Add a column";
const closeModal = () => {
  modalState.value = false;
  columnName.value = "";
};
const createNewColumn = () => {
  store.newColumn(columnName.value);
  closeModal();
};
</script>

<template>
  <div
    @click="modalState = true"
    class="h-28 w-80 flex-none self-start border border-dashed border-[#d0d7de] rounded-md"
  >
    <div
      class="h-full w-full flex justify-center items-center text-[#57606a] text-sm hover:underline cursor-pointer"
    >
      + Add column
    </div>
  </div>
  <Modal
    :modal-state="modalState"
    :modal-title="modalTitle"
    :close-modal="closeModal"
  >
    <div class="h-[11rem] w-full p-5">
      <label for="columnName" class="ml-1 text-gray-700">Column name</label>
      <input
        id="columnName"
        class="h-10 w-full pl-4 mt-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-0 focus:border-blue-500 focus:ring focus:bg-white"
        placeholder="Enter a column name (To Do, In Progress, Done)"
        type="text"
        v-model="columnName"
      />
      <button
        @click="createNewColumn"
        :disabled="!Boolean(columnName.length)"
        class="w-32 h-8 mt-8 text-white border border-gray-300 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 transition-all"
      >
        Create column
      </button>
    </div>
  </Modal>
</template>
