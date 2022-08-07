import type { WikiText } from "@/types/WikiPage";

export const canShow = (season: Number, episode: Number, text: WikiText) => (
  season > (text.season || 0) ||
  (season == text.season && episode >= (text.episode || 0))
);