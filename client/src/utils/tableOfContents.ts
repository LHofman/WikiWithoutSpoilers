import type { TOCTitle } from "@wws/shared/src/types/WikiPageTypes";

export const getSectionId = (tocTitle: TOCTitle): string =>
  `toc-${tocTitle.title[0].text.replace(/ /g, '-')}`;