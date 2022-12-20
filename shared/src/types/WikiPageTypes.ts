export type Content = {
  title: WikiText[],
  text?: WikiText[],
  subContent?: Content[],
};

export type InfoBox = {
  title: WikiText[],
  imageUrl: string,
  sections: InfoBoxSection[]
};
export type InfoBoxSection = {
  title: WikiText[],
  information: InfoBoxSectionInfo[]
};
export type InfoBoxSectionInfo = {
  title: WikiText[],
  value: WikiText[][],
};

  export type TOCTitle = {
  title: WikiText[];
  subTitles?: TOCTitle[];
};

export type WikiText = {
  text: string;
  season?: Number;
  episode?: Number;
  alternateText?: string;
  innerText?: WikiText[];
};

export type WikiPage = {
  titleId: string,
  type: string,
  title: WikiText[],
  intro: WikiText[],
  infoBox: InfoBox,
  content: Content[]
};