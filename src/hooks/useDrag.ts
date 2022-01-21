import { onMounted, onUnmounted, Ref } from "vue";

const useDrag = (
  ref: Ref<HTMLElement | null>,
  data: { columnId: string; noteId: string }
) => {
  let { noteId, columnId } = data;
  const dragstart = (e: DragEvent) => {
    e.dataTransfer?.setData("text/plain", `${columnId},${noteId}`);    
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
