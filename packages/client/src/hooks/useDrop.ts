import { onMounted, onUnmounted, Ref } from "vue";
import { useStore } from "~/store/content";

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
    /**
     * dragenter事件不支持用dataTransfer.getData()读取，只有在drop的时候可以
     * 参见：https://segmentfault.com/q/1010000000598879
     * 实现完善的拖拽效果需要用到全局状态来存储拖拽和dragenter的note对应信息
     * 这里先不写了，实现一个简陋版本，能用就行~
     */
    e.preventDefault();
    e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  };

  const dragover = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer && (e.dataTransfer.dropEffect = "move");
  };

  onMounted(() => {
    ref.value?.addEventListener("drop", drop);
    ref.value?.addEventListener("dragenter", dragenter);
    ref.value?.addEventListener("dragover", dragover);
  });
  onUnmounted(() => {
    ref.value?.removeEventListener("drop", drop);
    ref.value?.removeEventListener("dragenter", dragenter);
    ref.value?.removeEventListener("dragover", dragover);
  });
};

export default useDrop;
