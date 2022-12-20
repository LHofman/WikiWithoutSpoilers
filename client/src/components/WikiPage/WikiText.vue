<script lang="ts">
  import { mapState } from "pinia";
  import { defineComponent } from "vue";

  import type { WikiText } from "@wws/shared/src/types/WikiPageTypes";
  import { useProgressStore } from "@/stores/progress";
  import { convertToText } from "@/utils/wikiText";

  export default defineComponent({
    props: {
      component: {
        type: String,
        default: 'p',
      },
      prefix: {
        type: String,
        default: '',
      },
      text: {
        type: Array as () => WikiText[],
        required: true,
      },
    },
    computed: {
      ...mapState(useProgressStore, ['season', 'episode']),
      textHtml(): String {
        return this.prefix + convertToText(this.text, this.season, this.episode);
      },
    },
  });
</script>

<template>
  <component :is="component" v-html="textHtml" />
</template>