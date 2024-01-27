import create from "zustand";

const useStore = create((set) => ({
  isChat: false,
  setIsChat: (value) => set(() => ({ isChat: value })),
}));

export default useStore;
