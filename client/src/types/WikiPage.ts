export type Content = {
  title: WikiText,
  text?: WikiText[],
  subContent?: Content[],
};

export type InfoBox = {
  title: String,
  imageUrl: String,
  sections: InfoBoxSection[]
};
type InfoBoxSection = {
  title: String,
  information: InfoBoxSectionInfo[]
}
type InfoBoxSectionInfo = {
  title: String,
  value: WikiText[] | WikiText[][],
}

export type TOCTitle = {
  title: WikiText;
  subTitles?: TOCTitle[];
}

export type WikiText = {
  text: String;
  season?: Number;
  episode?: Number;
  alternateText?: String;
  innerText?: WikiText[];
}