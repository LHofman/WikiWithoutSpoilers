<script lang="ts">
  import { mapWritableState } from "pinia";
  import { defineComponent } from "vue";

  import { useProgressStore } from "@/stores/progress";
  import type { WikiText } from "@/types/WikiPage";
  import { WIKITEXT_INNER_TEXT_SUBSTRING } from '@/utils/constants';
  import { canShow } from "@/utils/wikiText";

  export default defineComponent({
    props: {
      text: {
        type: Array as () => WikiText[],
        required: true,
      },
    },
    computed: {
      ...mapWritableState(useProgressStore, ['season', 'episode']),
      textHtml(): String {
        const wikiTextToString = (text: WikiText[]) => {
          return text
            .map((text: WikiText) => {
              let out = canShow(this.season, this.episode, text)
                ? text.text
                : (text.alternateText || '');

              let index = 0;
              while (out.includes(WIKITEXT_INNER_TEXT_SUBSTRING)) {
                const replaceValue = text.innerText?.[index]
                  ? wikiTextToString([text.innerText?.[index]])
                  : '';
                out = out.replace(WIKITEXT_INNER_TEXT_SUBSTRING, replaceValue);
                index++;
              }

              return out;
            })
            .filter((text: String) => text.length)
            .join("");
        };

        return wikiTextToString(this.text);
      },
    },
  });
</script>

<template>
  <p v-html="textHtml" />
</template>