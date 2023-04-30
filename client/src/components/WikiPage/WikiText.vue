<script lang="ts">
  import { defineComponent } from "vue";

  import type { WikiText } from "@wws/shared/src/types/WikiPageTypes";
  import { convertToText } from "@/utils/wikiText";

  import EditWikiText from "./EditWikiPage/EditWikiText.vue";
import { mapState } from "pinia";
import { useGeneralStore } from "@/stores/general";

  export default defineComponent({
    props: {
      canEdit: {
        type: Boolean,
        default: true,
      },
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
    components: {
      EditWikiText,
    },
    computed: {
      ...mapState(useGeneralStore, ['isEditing']),
      textHtml(): String {
        return this.prefix + convertToText(this.text);
      },
    },
  });
</script>

<template>
  <component v-if="!isEditing || !canEdit" :is="component" v-html="textHtml" :id="$attrs['id']" />
  <EditWikiText v-else :text="text" :component="component" :id="$attrs['id']" />
</template>

<style>

</style>