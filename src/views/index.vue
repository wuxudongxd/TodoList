<script setup lang="ts">
import { provide, ref } from "vue";
import Column from "./Column.vue";
import Modal from "./Modal.vue";
import { store, storeFnSymbol, storeFn } from "../store/content";

// provide global state
provide(storeFnSymbol, storeFn);

// add new column
const modalState = ref(false);
const columnName = ref("");
const modalTitle = "Add a column";
const closeModal = () => {
  modalState.value = false;
  columnName.value = "";
};
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="h-24 bg-[#f6f8fa] border-b border-gray-300">TODO List</div>
    <div class="h-16">tabBar</div>
    <div class="flex-1 p-4 flex items-center space-x-4 overflow-auto">
      <Column
        v-for="column in store"
        :key="column.id"
        :column="column"></Column>
      <div
        @click="modalState = true"
        class="h-28 w-80 flex-none self-start border border-dashed border-[#d0d7de] rounded-md">
        <div
          class="h-full w-full flex justify-center items-center text-[#57606a] text-sm hover:underline cursor-pointer">
          + Add column
        </div>
      </div>
      <Modal
        :modal-state="modalState"
        :modal-title="modalTitle"
        :close-modal="closeModal">
        <div class="h-[11rem] w-full p-5">
          <label for="columnName" class="ml-1 text-gray-700">Column name</label>
          <input
            id="columnName"
            class="h-10 w-full pl-4 mt-2 bg-gray-100 border rounded-md focus:outline-0 focus:border-blue-500 focus:ring focus:bg-white"
            placeholder="Enter a column name (To Do, In Progress, Done)"
            type="text"
            v-model="columnName" />
          <button
            @click="storeFn.newColumn(columnName), closeModal"
            :disabled="!Boolean(columnName.length)"
            class="w-32 h-8 mt-8 text-white border border-gray-300 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 transition-all">
            Create column
          </button>
        </div>
      </Modal>
    </div>
  </div>
</template>
