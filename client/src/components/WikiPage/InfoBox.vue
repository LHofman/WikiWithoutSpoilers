<script lang="ts">
  import type { InfoBox } from "@/types/WikiPage";

  export default {
    props: {
      infoBox: Object as () => InfoBox
    }
  }
</script>

<template>
  <div>
    <div id="infobox-container">
      <div id="infobox-title" class="container-center">
        <h2>{{ infoBox.title }}</h2>
      </div>
      <img id="infobox-image" :src="infoBox.imageUrl" />
      <div v-for="section in infoBox.sections">
        <div class="infobox-section-title container-center">
          <h3>{{ section.title }}</h3>
        </div>
        <div v-for="sectionInfo in section.information" class="infobox-section-information">
          <p class="infobox-section-info-title"><strong>{{ sectionInfo.title }}</strong></p>
          <p v-if="!Array.isArray(sectionInfo.value)">{{ sectionInfo.value }}</p>
          <div v-else class="infobox-section-info-value-list">
            <p v-for="value in sectionInfo.value" class="infobox-section-info-value-item">{{ value }}</p>
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
  }

  .infobox-section-info-value-list {
    margin-top: 18px;
    margin-bottom: 18px;
  }

  .infobox-section-info-value-item {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>