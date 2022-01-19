import { onMounted, onUnmounted, Ref } from "vue";

const useDrag = (
  ref: Ref<HTMLElement | null>,
  data: { columnIndex: number; noteIndex: number }
) => {
  let { noteIndex, columnIndex } = data;
  const dragstart = (e: DragEvent) => {
    e.dataTransfer?.setData("text/plain", `${columnIndex}-${noteIndex}`);
  };

  const handlers = [dragstart];

  onMounted(() => {
    handlers.forEach((handler) => {
      ref.value?.addEventListener(handler.name, handler as any);
    });
  });
  onUnmounted(() => {
    handlers.forEach((handler) => {
      ref.value?.removeEventListener(handler.name, handler as any);
    });
  });
};

export default useDrag;
