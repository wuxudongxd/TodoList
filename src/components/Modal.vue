<script setup lang="ts">
import { ref } from "vue";

const { modalState, closeModal } = defineProps<{
  modalState: boolean;
  modalTitle: string;
  closeModal: () => void;
}>();
const modalRef = ref<HTMLElement | null>(null);

const modalBgHandler = (e: Event) => {
  if (!modalRef.value?.contains(e.target as HTMLElement)) {
    closeModal();
  }
};
</script>

<template>
  <teleport to="body">
    <div
      v-if="modalState"
      @click="modalBgHandler"
      class="absolute top-0 left-0 w-screen h-screen text-sm flex justify-center items-start bg-gray-800/60 z-20 transition-all">
      <div
        ref="modalRef"
        class="w-[32rem] max-h-[25rem] flex-none mt-16 rounded-md border bg-white overflow-hidden shadow-xl">
        <div
          class="h-16 bg-[#f6f8fa] border-b border-gray-300 flex items-center justify-between pl-6">
          <span>{{ modalTitle }}</span>
          <div
            class="w-16 h-full flex items-center justify-center cursor-pointer text-gray-600 hover:text-blue-600"
            @click="closeModal">
            X
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
