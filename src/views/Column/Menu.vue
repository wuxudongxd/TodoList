<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useStore } from "~/store/content";
import Modal from "~/components/Modal.vue";

// props
const { name, columnId } = defineProps<{
  name: string;
  columnId: string;
}>();

// pinia global store
const store = useStore();

// show menu
const menuRef = ref<HTMLElement | null>(null);
const menuState = ref(false);
const menuBgHandler = (e: Event) => {
  if (!menuRef.value?.contains(e.target as HTMLElement)) {
    menuState.value = false;
  }
};
onMounted(() => {
  window.addEventListener("click", menuBgHandler);
});
onUnmounted(() => {
  window.removeEventListener("click", menuBgHandler);
});

// edit and delete column
const modalState = ref<"" | "edit" | "delete">("");
const newColName = ref(name);
const closeModal = () => {
  modalState.value = "";
};
const updateColumn = () => {
  store.setColName(columnId, newColName.value);
  closeModal();
};
</script>

<template>
  <div class="relative">
    <div
      class="mb-4 text-2xl ml-3 cursor-pointer hover:text-blue-500"
      @click.stop="menuState = true"
    >
      ...
    </div>
    <div v-if="menuState" ref="menuRef" class="absolute top-10 -right-2">
      <div class="triangle"></div>
      <div
        class="text-sm border border-gray-300 rounded-md overflow-hidden bg-white py-1"
      >
        <div
          @click="modalState = 'edit'"
          class="w-44 h-8 flex items-center pl-4 cursor-pointer bg-white border-b border-gray-300 hover:bg-[#0969da] hover:text-white transition-all"
        >
          Edit column
        </div>
        <div
          @click="modalState = 'delete'"
          class="w-44 h-8 flex items-center pl-4 cursor-pointer bg-white hover:bg-[#0969da] hover:text-white transition-all"
        >
          Delete column
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <Modal
    :modal-state="modalState == 'edit'"
    :modal-title="`Edit ${name}`"
    :close-modal="closeModal"
  >
    <div class="h-[11rem] w-full p-5">
      <label for="columnName" class="ml-1 text-gray-700">Column name</label>
      <input
        id="columnName"
        class="h-10 w-full pl-4 mt-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-0 focus:border-blue-500 focus:ring focus:bg-white"
        placeholder="Enter a column name (To Do, In Progress, Done)"
        type="text"
        v-model="newColName"
      />
      <button
        @click="updateColumn"
        :disabled="!Boolean(newColName.length)"
        class="w-32 h-8 mt-8 text-white border border-gray-300 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 transition-all"
      >
        Update column
      </button>
    </div>
  </Modal>

  <!-- Delete Modal -->
  <Modal
    :modal-state="modalState == 'delete'"
    :modal-title="`Delete ${name}`"
    :close-modal="closeModal"
  >
    <div class="h-[11rem] w-full p-5">
      <div class="text-sm text-gray-600">
        This action will remove any cards and automation preset associated with
        the column.
      </div>
      <div class="mt-8">
        <button
          @click="store.deleteCol(columnId)"
          class="w-32 h-8 text-red-600 border border-gray-300 rounded-md bg-gray-100 hover:bg-red-700 hover:text-white transition-all"
        >
          Delete column
        </button>
        <button
          @click="closeModal"
          class="w-20 h-8 ml-2 text-gray-700 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200/70 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss">
.triangle {
  &::before {
    content: "";
    position: absolute;
    top: -16px;
    right: 9px;
    border-width: 8px;
    border-color: transparent transparent #e5e7eb transparent;
  }
  &::after {
    content: "";
    position: absolute;
    top: -13px;
    right: 10px;
    border-width: 7px;
    border-color: transparent transparent #fff transparent;
  }
}
</style>
