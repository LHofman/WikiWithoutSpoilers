import { defineStore } from "pinia";

export const useGeneralStore = defineStore({
  id: "general",
  state: () => ({
    isEditing: false as Boolean,
  }),
  persist: true,
});