<script setup lang="ts">
import { useStore } from "~/store/content";
import Column from "~/views/Column/index.vue";
import CreateColumn from "~/views/Board/CreateColumn.vue";

const store = useStore();
store.initList();
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- header -->
    <div class="h-24 bg-[#f6f8fa] border-b border-gray-300 flex items-center">
      <div class="ml-6 text-gray-700 text-lg">Todo List</div>
    </div>

    <!-- todo list body -->
    <div class="flex-1 p-4 flex items-center space-x-4 overflow-auto">
      <Column
        v-for="column in store.list"
        :key="column.id"
        :column="column"
      ></Column>
      <CreateColumn></CreateColumn>
    </div>
  </div>
</template>
