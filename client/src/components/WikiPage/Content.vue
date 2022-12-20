<script lang="ts">
  import { defineComponent } from "vue";

  import type { Content } from "@wws/shared/src/types/WikiPageTypes";
  import { getSectionId } from "@/utils/tableOfContents";
  import { filterWikiTextList } from "@/utils/wikiText";
  
  import WikiText from "./WikiText.vue";

  export default defineComponent({
    props: {
      content: {
        type: Array as () => Content[],
        required: true,
      },
      headerTagNumber: {
        type: Number,
        default: 2,
      },
    },
    components: {
      WikiText,
    },
    computed: {
      filteredSections(): Content[] {
        return filterWikiTextList(this.content);
      },
      isMainHeader(): Boolean {
        return this.headerTagNumber === 2;
      },
    },
    methods: {
      getSectionId,
    },
  });
</script>

<template>
  <div>
    <div :class="{ mainHeader: isMainHeader, subHeader: !isMainHeader }" v-for="section in filteredSections">
      <WikiText :id="getSectionId(section)" :component="'h' + headerTagNumber" :text="section.title" />
      <hr v-if="isMainHeader"/>
      <WikiText v-if="section.text" :text="section.text" />
      <Content v-if="section.subContent" :content="section.subContent" :headerTagNumber="headerTagNumber + 1" />
    </div>
  </div>
</template>

<style>
  .mainHeader {
    margin-top: 50px;
  }

  .subHeader {
    margin-top: 35px;
  }
</style>