import { inject, onMounted, onUnmounted, Ref } from "vue";
import { storeFnSymbol } from "../store/content";

const useDrop = (
  ref: Ref<HTMLElement | null>,
  data: { columnIndex: number }
) => {
  const { columnIndex } = data;
  const { updateStore } = inject(storeFnSymbol) as { updateStore: Function };
  const drop = (e: DragEvent) => {
    e.preventDefault();
    const regex = /^(\d*)-(\d*)$/g;
    const dragData = e.dataTransfer?.getData("text") as string;
    const [_, FromColumnIndexStr, FromNoteIndexStr] = regex.exec(
      dragData
    ) as RegExpExecArray;
    updateStore(
      Number(FromColumnIndexStr),
      Number(FromNoteIndexStr),
      columnIndex
    );
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
