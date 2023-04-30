<script lang="ts">
  import { defineComponent } from "vue";
  
  import type { TOCTitle } from "@wws/shared/src/types/WikiPageTypes";
  import { getSectionId } from "@/utils/tableOfContents";
  import {  filterWikiTextList } from "@/utils/wikiText";
  
  import WikiText from "./WikiText.vue";

  export default defineComponent({
    props: {
      titles: {
        type: Array as () => TOCTitle[],
        required: true,
      },
      parentNumber: String,
    },
    components: {
      WikiText,
    },
    computed: {
      filteredTitles(): TOCTitle[] {
        return filterWikiTextList(this.titles);
      },
    },
    methods: {
      getNumber(idx: number): string {
        return `${ this.parentNumber ? `${this.parentNumber}.` : ''}${ idx + 1 }`;
      },
      getSectionId
    },
  });
</script>

<template>
  <ul>
    <li v-for="(title, idx) in filteredTitles">
      <a :href="'#' + getSectionId(title)">
        <WikiText :prefix="getNumber(idx) + '. '" :text="title.title" :canEdit="false" />
      </a>
      <span v-if="title.subTitles?.length">
        <TableOfContent class="subTitles" :titles="title.subTitles" :parentNumber="getNumber(idx)" />
      </span>
    </li>
  </ul>
</template>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-top: 10px;
  }

  .subTitles {
    margin-left: 15px;
  }
</style>