import type { WikiText } from "@wws/shared/src/types/WikiPageTypes";
import { useProgressStore } from "@/stores/progress";
import { WIKITEXT_INNER_TEXT_SUBSTRING } from '@/utils/constants';

export const canShowText = (season: Number, episode: Number, text: WikiText[]) => (
  text.some((text: WikiText) => canShow(season, episode, text))
);

export const canShow = (season: Number, episode: Number, text: WikiText): boolean => (
  season > (text.season || 0) ||
  (season == text.season && episode >= (text.episode || 0))
);

export const filterWikiTextList = (text: { title: WikiText[] }[]): { title: WikiText[] }[] => {
  const progressStore = useProgressStore();
  return text.filter((content) => canShowText(progressStore.season, progressStore.episode, content.title));
};

export const convertToText = (text: WikiText[], season: Number, episode: Number): string => (
  text
    .map((text: WikiText) => {
      let out = canShow(season, episode, text)
        ? text.text
        : (text.alternateText || '');

      let index = 0;
      while (out.includes(WIKITEXT_INNER_TEXT_SUBSTRING)) {
        const replaceValue = text.innerText?.[index]
          ? convertToText([text.innerText?.[index]], season, episode)
          : '';
        out = out.replace(WIKITEXT_INNER_TEXT_SUBSTRING, replaceValue);
        index++;
      }

      return out;
    })
    .filter((text: String) => text.length)
    .join("")
);