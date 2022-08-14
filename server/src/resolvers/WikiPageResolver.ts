import { WikiPage as WikiPageType } from "@wws/shared/src/types/WikiPageTypes";

import WikiPageModel from "../models/WikiPageModel";

type Args = {
  titleId: string,
}

export default () => {
  return {
    wikiPage: async (parent: undefined, args: Args): Promise<WikiPageType | null> => {
      return await WikiPageModel.findOne({ titleId: args.titleId });
    }
  };
}