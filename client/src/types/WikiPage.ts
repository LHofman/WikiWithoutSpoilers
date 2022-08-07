export type Content = {
  title: String,
  text?: String,
  subContent?: Content[],
};

export type InfoBox = {
  title: String,
  imageUrl: String,
  sections: [
    {
      title: String,
      information: [
        {
          title: String,
          value: InfoBoxInformationValue | InfoBoxInformationValue[],
        }
      ]
    }
  ]
};
export type InfoBoxInformationValue = String | Number;

export type TOCTitle = TOCTitleObject | String;
type TOCTitleObject = {
  title: String;
  subTitles?: TOCTitle[];
}