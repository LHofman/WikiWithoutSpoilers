import type { WikiText } from "@wws/shared/src/types/WikiPageTypes";
import { useGeneralStore } from "@/stores/general";
import { useProgressStore } from "@/stores/progress";
import { WIKITEXT_INNER_TEXT_SUBSTRING } from '@/utils/constants';

export const canShowText = (text: WikiText[]) => text.some((text: WikiText) => canShow(text));

export const canShow = (text: WikiText): boolean => {
  const generalStore = useGeneralStore();
  if (generalStore.isEditing) {
    return true;
  }

  const progressStore = useProgressStore();
  const season = progressStore.season;
  const episode = progressStore.episode;
  return season > (text.season || 0) || (season == text.season && episode >= (text.episode || 0));
};

type ContentWithWikiText = { title: WikiText[] };
export const filterWikiTextList = (text: ContentWithWikiText[]): ContentWithWikiText[] =>
  text.filter((content) => canShowText(content.title));

export const convertToText = (text: WikiText[]): string => convertToTextArray(text).join("");

export const convertToTextArray = (text: WikiText[]): string[] => {
  return text
    .map((text: WikiText) => {
      let out = canShow(text) ? text.text : (text.alternateText || '');

      let index = 0;
      while (out.includes(WIKITEXT_INNER_TEXT_SUBSTRING)) {
        const replaceValue = text.innerText?.[index]
          ? convertToText([text.innerText?.[index]])
          : '';
        out = out.replace(WIKITEXT_INNER_TEXT_SUBSTRING, replaceValue);
        index++;
      }

      return out;
    })
    .filter((text: String) => text.length);
};