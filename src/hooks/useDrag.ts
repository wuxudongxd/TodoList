import { onMounted, onUnmounted, Ref } from "vue";

const useDrag = (
  ref: Ref<HTMLElement | null>,
  data: { columnId: string; noteId: string }
) => {
  let { noteId, columnId } = data;
  const dragstart = (e: DragEvent) => {
    e.dataTransfer?.setData("text/plain", `${columnId},${noteId}`);
  };

  onMounted(() => {
    ref.value?.addEventListener("dragstart", dragstart);
  });
  onUnmounted(() => {
    ref.value?.addEventListener("dragstart", dragstart);
  });
};

export default useDrag;
