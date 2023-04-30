<script lang="ts">
  import { mapWritableState } from "pinia";
  import { defineComponent } from "vue";

  import type { Content as ContentType, TOCTitle, WikiPage as WikiPageType } from "@wws/shared/src/types/WikiPageTypes";
  import { useGeneralStore } from "@/stores/general";

  import { wikiPage } from '../../api/queries/wikiPage';

  import Content from "../../components/WikiPage/Content.vue";
  import InfoBox from "../../components/WikiPage/InfoBox.vue";
  import TableOfContent from "../../components/WikiPage/TableOfContent.vue";
  import WikiText from "../../components/WikiPage/WikiText.vue";

  export default defineComponent({
    apollo: {
      wikiPage: {
        query: wikiPage,
        variables: {
          titleId: "hannibal_lector",
        },
      },
    },
    components: {
      Content,
      InfoBox,
      TableOfContent,
      WikiText,
    },
    data() {
      return {
        wikiPage: undefined as WikiPageType | undefined,
      };
    },
    computed: {
      ...mapWritableState(useGeneralStore, ['isEditing']),
      tableOfContentTitles(): TOCTitle[] {
        const contentToTOCTitle = (content: ContentType ): TOCTitle => {
          return {
            title: content.title,
            ...(content.subContent ? { subTitles: content.subContent.map(contentToTOCTitle) } : {})
          };
        };

        return (this.wikiPage as WikiPageType).content.map(contentToTOCTitle);
      },
    },
  });
</script>

<template>
  <div v-if="wikiPage">
    <div id="title-bar">
      <WikiText id="title" :component="'h1'" :text="wikiPage.title" />
      <b-button variant="primary" @click="isEditing = !isEditing">Edit</b-button>
    </div>

    <div id="general-info">
      <div id="intro-with-toc">
        <WikiText :text="wikiPage.intro" />

        <TableOfContent id="table-of-contents" :titles="tableOfContentTitles"/>
      </div>

      <InfoBox id="info-box" :infoBox="wikiPage.infoBox"/>
    </div>

    <Content id="content" :content="wikiPage.content" />
  </div>
</template>

<style>
  #content {
    margin-top: 50px;
  }

  #general-info {
    display: flex;
    justify-content: space-between;
  }

  #info-box {
    border: 1px solid black;
    width: 30%;
  }

  #intro-with-toc {
    width: 65%;
  }

  #table-of-contents {
    border: 1px solid black;
    width: fit-content;
    padding: 10px;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  #title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 65%;
  }
</style>