import { onMounted, onUnmounted, Ref } from "vue";
import { useStore } from "Store/content";

const useDrop = (ref: Ref<HTMLElement | null>, data: { columnId: string }) => {
  const { columnId } = data;
  const store = useStore();

  const drop = (e: DragEvent) => {
    e.preventDefault();
    const regex = /^(\S*),(\S*)$/g;
    const dragData = e.dataTransfer?.getData("text") as string;
    const [_, FromColumnId, FromNoteId] = regex.exec(
      dragData
    ) as RegExpExecArray;

    store.updateStore(FromColumnId, FromNoteId, columnId);
  };

  const dragenter = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  };

  const dragover = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  };

  const dragleave = (e: DragEvent) => {};

  const handlers = [drop, dragenter, dragover, dragleave];

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

export default useDrop;
