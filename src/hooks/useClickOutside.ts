import { onMounted, onUnmounted, Ref } from "vue";

const useClickOutside = (
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) => {
  const clickHandler = (e: Event) => {
    if (!elementRef.value?.contains(e.target as HTMLElement)) {
      callback();
    }
  };
  onMounted(() => {
    document.addEventListener("click", clickHandler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", clickHandler);
  });
};

export default useClickOutside;
