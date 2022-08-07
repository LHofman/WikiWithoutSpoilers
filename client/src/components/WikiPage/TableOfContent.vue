<script lang="ts">
  import type { TOCTitle } from "@/types/WikiPage";
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      titles: Array as () => TOCTitle[],
      parentNumber: String,
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
    <li v-for="(title, idx) in titles">
      <span v-if="title instanceof String">{{ getTitle(idx, title) }}</span>
      <span v-else>
        {{ getTitle(idx, title.title) }}
        <span v-if="title.subTitles?.length">
          <TableOfContent class="subTitles" :titles="title.subTitles" :parentNumber="getNumber(idx)" />
        </span>
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