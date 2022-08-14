export type Content = {
  title: WikiText,
  text?: WikiText,
  subContent?: Content[],
};

export type InfoBox = {
  title: WikiText,
  imageUrl: String,
  sections: InfoBoxSection[]
};
type InfoBoxSection = {
  title: WikiText,
  information: InfoBoxSectionInfo[]
};
type InfoBoxSectionInfo = {
  title: WikiText,
  value: WikiText[],
};

export type TOCTitle = {
  title: WikiText;
  subTitles?: TOCTitle[];
};

export type WikiText = {
  text: String;
  season?: Number;
  episode?: Number;
  alternateText?: String;
  innerText?: WikiText;
}[];

export type WikiPage = {
  titleId: string,
  type: string,
  title: WikiText,
  intro: WikiText,
  infoBox: InfoBox,
  content: Content[]
};