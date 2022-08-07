<script lang="ts">
  import { mapWritableState } from "pinia";
  import { defineComponent } from "vue";
  
  import { useProgressStore } from "@/stores/progress";
  import type { TOCTitle, WikiText } from "@/types/WikiPage";
  import { canShow } from "@/utils/wikiText";

  export default defineComponent({
    props: {
      titles: {
        type: Array as () => TOCTitle[],
        required: true,
      },
      parentNumber: String,
    },
    computed: {
      ...mapWritableState(useProgressStore, ["season", "episode"]),
      filteredTitles() {
        return this.titles.filter(
          (title: TOCTitle) => canShow(this.season, this.episode, title.title)
        );
      },
    },
    methods: {
      getNumber(idx: number): String {
        return `${ this.parentNumber ? `${this.parentNumber}.` : ''}${ idx + 1 }`;
      },
      getTitle(idx: number, title: String) {
        return `${this.getNumber(idx)}. ${title}`;
      }
    },
  })
</script>

<template>
  <ul>
    <li v-for="(title, idx) in filteredTitles">
      {{ getTitle(idx, title.title.text) }}
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