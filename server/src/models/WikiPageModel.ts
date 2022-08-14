import mongoose from "mongoose";

import { WikiPage as WikiPageType } from "@wws/shared/src/types/WikiPageTypes";

const { Schema } = mongoose;

const WikiText = new Schema({
  text: {
    type: String,
    required: true,
  },
  season: Number,
  episode: Number,
  alternateText: String,
});
WikiText.add({
  innerText: [WikiText]
});

const Content = new Schema({
  title: {
    type: [WikiText],
    required: true,
  },
  text: [WikiText],
});
Content.add({
  subContent: [Content],
});

const WikiPageSchema = new Schema<WikiPageType>({
  titleId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: [WikiText],
    required: true,
  },
  intro: {
    type: [WikiText],
    required: true,
  },
  infoBox: {
    type: {
      title: {
        type: [WikiText],
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      sections: {
        type: [{
          title: {
            type: [WikiText],
            required: true,
          },
          information: {
            type: [{
              title: {
                type: [WikiText],
                required: true,
              },
              value: [[WikiText]],
            }],
            required: true,
          },
        }],
        required: true,
      },
    },
    required: true,
  },
  content: [Content],
}, { collection: "wiki_pages" });

export default mongoose.model("WikiPage", WikiPageSchema);