export type Content = {
  title: String,
  text?: String,
  subContent?: Content[],
};

type TOCTitleObject = {
  title: String;
  subTitles?: TOCTitle[];
}
export type TOCTitle = TOCTitleObject | String;