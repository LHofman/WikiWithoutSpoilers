<script lang="ts">
  import type { Content as ContentType, TOCTitle } from "@/types/WikiPage";
  import { defineComponent } from "vue";
  import Content from "../components/WikiPage/Content.vue";
  import InfoBox from "../components/WikiPage/InfoBox.vue";
  import Intro from "../components/WikiPage/Intro.vue";
  import TableOfContent from "../components/WikiPage/TableOfContent.vue";
  import Title from "../components/WikiPage/Title.vue";

  export default defineComponent({
    components: {
      Intro,
      Title,
      InfoBox,
      TableOfContent,
      Content
    },
    data() {
      return {
        title: "Hannibal Lecter",
        intro: "Dr. Hannibal Lecter is the titular main antagonist of the NBC show Hannibal.<br/><br/>Hannibal is a psychiatrist who works with Special Agent Will Graham to track down serial killers. Unknown to his colleagues, Hannibal is a cannibalistic serial killer known as the Chesapeake Ripper, who works behind Graham's back to further his own crimes. However, he sometimes uses them for other purposes such as committing two murders as a 'copycat' of the crimes of Garret Jacob Hobbs to present Graham with a clearer picture of the true killer's motives.",
        infoBox: {
          title: "Hannibal Lecter",
          imageUrl: "https://static.wikia.nocookie.net/hannibal/images/1/16/HBL_S2_Lecter_Portrait4.jpg"/*/revision/latest/scale-to-width-down/350?cb=20200703051856"*/,
          sections: [
            {
              title: "Information",
              information: [
                {
                  title: "Age",
                  value: 49,
                },
                {
                  title: "Alias(es)",
                  value: [
                    "The Chesapeake Ripper",
                    "The Copycat Killer",
                    "Il Mostro di Firenze",
                    "Roman Fell (False Identity)",
                  ],
                },
              ],
            },
            {
              title: "Relations",
              information: [
                {
                  title: "Relatives",
                  value: [
                    "Mischa Lecter (Sister)",
                    "Lady Murasaki (Aunt)",
                    "Robertus (Uncle)",
                  ],
                },
              ],
            },
            {
              title: "Behind the scenes",
              information: [
                {
                  title: "First appearance",
                  value: "Apéritif",
                },
                {
                  title: "Last appearance",
                  value: "The Wrath of the Lamb",
                },
                {
                  title: "Portrayed by",
                  value: "Mads Mikkelsen",
                },
              ],
            },
          ],
        },
        content: [
          {
            title: "History",
            text: "Hannibal Lecter was born in Lithuania to Count Lecter, a Lithuanian aristocrat and Simonetta Sforza-Lecter, an Italian mother.",
          },
          {
            title: "Biography",
            text: "Hannibal took a keen interest in Graham, whom he sensed to be similar minded.",
          },
          {
            title: "Aliases and Victims",
            subContent: [
              {
                title: "The Chesapeake Ripper",
                text: "As the Chesapeake Ripper, Lecter kills in sounders (referring to a small group of pigs) of three.",
              },
              {
                title: "The Copycat Killer",
                text: "While Lecter primarily kills as the Chesapeake Ripper, he has frequently murdered as a copycat killer, using his behind-the-scenes knowledge to copy other murderers and sometimes frame others for the crimes.",
              },
              {
                title: "II Mostro di Firenze",
                text: "Hannibal's activities in Europe are under the guise of \"Il Mostro di Firenze\", Italian for \"The Monster of Florence\".",
              },
            ],
          },
        ],
      };
    },
    computed: {
      tableOfContentTitles(): TOCTitle[] {
        const contentToTOCTitle = (content: ContentType ): TOCTitle => {
          return {
            title: content.title,
            ...(content.subContent ? { subTitles: content.subContent.map(contentToTOCTitle) } : {})
          };
        };

        return this.content.map(contentToTOCTitle);
      }
    }
  });
</script>

<template>
  <Title :text="title" />

  <div id="general-info">
    <div id="intro-with-toc">
      <Intro :text="intro" />

      <TableOfContent id="table-of-contents" :titles="tableOfContentTitles"/>
    </div>

    <InfoBox id="info-box" :infoBox="infoBox"/>
  </div>

  <Content id="content" :content="content" />
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
</style>