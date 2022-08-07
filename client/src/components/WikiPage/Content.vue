<script lang="ts">
  import { mapWritableState } from "pinia";
  import { defineComponent } from "vue";

  import { useProgressStore } from "@/stores/progress";
  import type { Content } from "@/types/WikiPage";
  import { canShow } from "@/utils/wikiText";
  
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
    computed: {
        ...mapWritableState(useProgressStore, ["season", "episode"]),
        sections(): Content[] {
            return this.content.filter((content: Content) => canShow(this.season, this.episode, content.title));
        },
        headerTag(): String {
            return `h${this.headerTagNumber}`;
        },
        isMainHeader(): Boolean {
            return this.headerTagNumber === 2;
        },
        nextHeaderTagNumber(): Number {
            return this.headerTagNumber + 1;
        },
    },
    components: { WikiText }
});
</script>

<template>
  <div>
    <div :class="{ mainHeader: isMainHeader, subHeader: !isMainHeader }" v-for="section in sections">
      <component :is="headerTag">{{ section.title.text }}</component>
      <hr v-if="isMainHeader"/>
      <WikiText v-if="section.text" :text="section.text" />
      <Content v-if="section.subContent" :content="section.subContent" :headerTagNumber="nextHeaderTagNumber" />
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