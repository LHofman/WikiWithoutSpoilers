import gql from "graphql-tag";

export const wikiText = gql`
  fragment WikiText on WikiText {
    ...WikiTextInner
    innerText {
      ...WikiTextInner
      innerText {
        ...WikiTextInner
      }
    }
  }
  fragment WikiTextInner on WikiText {
    text
    season
    episode
    alternateText
  }
`;

export const content = gql`
  fragment Content on Content {
    ...ContentInner
    subContent {
      ...ContentInner
    }
  }
  fragment ContentInner on Content {
    title { ...WikiText }
    text { ...WikiText }
  }
`;