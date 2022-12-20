import gql from "graphql-tag";

import { content, wikiText } from "./fragments/wikiPage";

export const wikiPage = gql`
  query WikiPage($titleId: String!) {
    wikiPage(titleId: $titleId) {
      titleId
      type
      title { ...WikiText }
      intro { ...WikiText }
      infoBox {
        title { ...WikiText }
        imageUrl
        sections {
          title { ...WikiText }
          information {
            title { ...WikiText }
            value { ...WikiText }
          }
        }
      }
      content { ...Content }
    }
  }

  ${wikiText}

  ${content}
`;