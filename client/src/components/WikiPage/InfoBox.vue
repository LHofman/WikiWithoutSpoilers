<script lang="ts">
  import { defineComponent } from "vue";

  import type { InfoBox, InfoBoxSection, InfoBoxSectionInfo } from "@wws/shared/src/types/WikiPageTypes";
  import { filterWikiTextList } from "@/utils/wikiText";
  
  import WikiText from "./WikiText.vue";

  export default defineComponent({
    props: {
      infoBox: {
        type: Object as () => InfoBox,
        required: true,
      },
    },
    components: {
      WikiText,
    },
    computed: {
      filteredSections(): InfoBoxSection[] {
        return filterWikiTextList(this.infoBox.sections) as InfoBoxSection[];
      },
    },
    methods: {
      getFilteredSectionInfo(section: InfoBoxSection): InfoBoxSectionInfo[] {
        return filterWikiTextList(section.information) as InfoBoxSectionInfo[];
      },
    },
  });
</script>

<template>
  <div>
    <div id="infobox-container">
      <div id="infobox-title" class="container-center">
        <WikiText :component="'h2'" :text="infoBox.title" />
      </div>
      <img id="infobox-image" :src="infoBox.imageUrl" />
      <div v-for="section in filteredSections">
        <div class="infobox-section-title container-center">
          <WikiText :component="'h3'" :text="section.title" />
        </div>
        <div v-for="sectionInfo in getFilteredSectionInfo(section)" class="infobox-section-information">
          <p class="infobox-section-info-title">
            <WikiText :component="'strong'" :text="sectionInfo.title" />
          </p>
          <WikiText v-if="sectionInfo.value.length === 1" :text="sectionInfo.value[0]" />
          <div v-else class="infobox-section-info-value-list">
            <WikiText v-for="value in sectionInfo.value" class="infobox-section-info-value-item" :text="value" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #infobox-container {
    display: flex;
    flex-direction: column;
  }

  #infobox-title {
    overflow: hidden;
    height: 50px;
    background-color: darkred;
  }
  
  #infobox-image {
    width: 100%;
  }

  .infobox-section-title {
    overflow: hidden;
    height: 40px;
    background-color: darkred;
  }
  
  .infobox-section-information {
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
  }

  .infobox-section-info-title {
    margin-left: 5px;
    margin-right: 10px;
    width: 30%;
    padding-top: 5px;
    padding-left: 5px;
  }

  .infobox-section-info-value-list {
    margin-top: 18px;
    margin-bottom: 18px;
  }

  .infobox-section-info-value-item {
    margin-top: 0;
    margin-bottom: 0;
  }

  #infobox-container p {
    font-size: 14px;
  }
</style>