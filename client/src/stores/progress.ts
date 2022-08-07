import { defineStore } from "pinia";

export const useProgressStore = defineStore({
  id: "progress",
  state: () => ({
    season: 2 as Number,
    episode: 7 as Number,
  }),
  persist: true,
});