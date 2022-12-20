import { gql } from "apollo-server";

export default gql`
  type Content {
    title: [WikiText],
    text: [WikiText],
    subContent: [Content]
  }

  type InfoBox {
    title: [WikiText],
    imageUrl: String,
    sections: [InfoBoxSection]
  }

  type InfoBoxSection {
    title: [WikiText],
    information: [InfoBoxSectionInfo]
  }

  type InfoBoxSectionInfo {
    title: [WikiText],
    value: [[WikiText]]
  }

  type WikiPage {
    titleId: String!,
    type: String,
    title: [WikiText],
    intro: [WikiText],
    infoBox: InfoBox
    content: [Content]
  }

  type WikiText {
    text: String,
    season: Int,
    episode: Int,
    alternateText: String,
    innerText: [WikiText]
  }

  type Query {
    wikiPage(titleId: String!): WikiPage,
  }

  schema {
    query: Query
  }
`;