<script setup lang="ts">
import { inject, ref } from "vue";
import { storeFnSymbol } from "../store/content";

const { modalState, closeModal } = defineProps<{
  modalState: boolean;
  closeModal: Function;
}>();
const { newColumn } = inject(storeFnSymbol) as { newColumn: Function };

const modalRef = ref<HTMLElement | null>(null);
const columnName = ref("");

const closeModalAndCleanInput = () => {
  closeModal();
  columnName.value = "";
};

const modalBgHandler = (e: Event) => {
  if (!modalRef.value?.contains(e.target as HTMLElement)) {
    closeModalAndCleanInput();
  }
};

const createColumn = () => {
  newColumn(columnName.value);
  closeModalAndCleanInput();
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="modalState"
      @click="modalBgHandler"
      class="absolute top-0 left-0 w-screen h-screen flex justify-center bg-gray-800/60 transition-all">
      <div
        ref="modalRef"
        class="w-[32rem] h-60 mt-16 rounded-md bg-white overflow-hidden shadow-xl">
        <div
          class="h-16 bg-[#f6f8fa] border-b border-gray-300 flex items-center justify-between pl-6">
          <span>Add a column</span>
          <div
            class="w-16 h-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-blue-600"
            @click="closeModalAndCleanInput">
            X
          </div>
        </div>
        <div class="h-[11rem] w-full p-5">
          <input
            class="h-10 w-full pl-4 bg-gray-100 border rounded-md focus:outline-0 focus:border-blue-500 focus:ring focus:bg-white"
            placeholder="Enter a column name (To Do, In Progress, Done)"
            type="text"
            v-model="columnName" />
          <button
            @click="createColumn"
            :disabled="!Boolean(columnName.length)"
            class="w-32 h-8 mt-10 text-white text-sm rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 transition-all">
            Create column
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
