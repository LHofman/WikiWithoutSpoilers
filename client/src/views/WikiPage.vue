<script lang="ts">
  import { defineComponent } from "vue";

  import type { Content as ContentType, InfoBox as InfoBoxType, TOCTitle, WikiText } from "@/types/WikiPage";
  import { WIKITEXT_INNER_TEXT_SUBSTRING } from "@/utils/constants";

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
        intro: [
          {
            text: "Dr. Hannibal Lecter is the titular main antagonist of the NBC show Hannibal.<br/><br/>",
          },
          {
            text: "Hannibal is a psychiatrist who works with Special Agent Will Graham to track down serial killers.",
          },
          {
            text: ` Unknown to his colleagues, Hannibal is a cannibalistic serial killer${WIKITEXT_INNER_TEXT_SUBSTRING}, who works behind Graham's back to further his own crimes.`,
            innerText: [
              {
                text: " known as the Chesapeake Ripper",
                season: 2,
                episode: 7,
              }
            ]
          },
          {
            text: ` However, he sometimes uses them for other purposes such as committing ${WIKITEXT_INNER_TEXT_SUBSTRING} as a 'copycat' of the crimes of Garret Jacob Hobbs to present Graham with a clearer picture of the true killer's motives.`,
            season: 1,
            episode: 5,
            innerText: [
              {
                text: "two murders",
                season: 1,
                episode: 7,
                alternateText: "a murder",
              },
            ],
          },
        ] as WikiText[],
        infoBox: {
          title: "Hannibal Lecter",
          imageUrl: "https://static.wikia.nocookie.net/hannibal/images/1/16/HBL_S2_Lecter_Portrait4.jpg"/*/revision/latest/scale-to-width-down/350?cb=20200703051856"*/,
          sections: [
            {
              title: "Information",
              information: [
                {
                  title: "Age",
                  value: [{ text: "49" }],
                },
                {
                  title: "Alias(es)",
                  value: [
                    [{
                      text: "The Chesapeake Ripper",
                      season: 2,
                      episode: 7,
                    }],
                    [{
                      text: "The Copycat Killer",
                      season: 1,
                      episode: 5,
                    }],
                    [{
                      text: "Il Mostro di Firenze",
                      season: 3,
                      episode: 1,
                    }],
                    [{ text: "Roman Fell (False Identity)" }],
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
                    [{ text: "Mischa Lecter (Sister)" }],
                    [{ text: "Lady Murasaki (Aunt)" }],
                    [{ text: "Robertus (Uncle)" }],
                  ],
                },
              ],
            },
            {
              title: "Behind the scenes",
              information: [
                {
                  title: "First appearance",
                  value: [{ text: "Apéritif" }],
                },
                {
                  title: "Last appearance",
                  value: [{ text: "The Wrath of the Lamb" }],
                },
                {
                  title: "Portrayed by",
                  value: [{ text: "Mads Mikkelsen" }],
                },
              ],
            },
          ],
        } as InfoBoxType,
        content: [
          {
            title: { text: "History" },
            text: [{ text: "Hannibal Lecter was born in Lithuania to Count Lecter, a Lithuanian aristocrat and Simonetta Sforza-Lecter, an Italian mother." }],
          },
          {
            title: { text: "Biography" },
            text: [{ text: "Hannibal took a keen interest in Graham, whom he sensed to be similar minded." }],
          },
          {
            title: { text: "Aliases and Victims" },
            subContent: [
              {
                title: {
                  text: "The Chesapeake Ripper",
                  season: 2,
                  episode: 7,
                },
                text: [{ text: "As the Chesapeake Ripper, Lecter kills in sounders (referring to a small group of pigs) of three." }],
              },
              {
                title: {
                  text: "The Copycat Killer",
                  season: 1,
                  episode: 5,
                },
                text: [{
                  text: `While Lecter primarily kills as the Chesapeake Ripper, he has ${WIKITEXT_INNER_TEXT_SUBSTRING}murdered as a copycat killer, using his behind-the-scenes knowledge to copy other murderers and sometimes frame others for the crimes.`,
                  innerText: [{ 
                    text: "frequently ",
                    season: 1,
                    episode: 9,
                  }]
                }],
              },
              {
                title: {
                  text: "II Mostro di Firenze",
                  season: 3,
                  episode: 1
                },
                text: [{ text: "Hannibal's activities in Europe are under the guise of \"Il Mostro di Firenze\", Italian for \"The Monster of Florence\"." }],
              },
            ],
          },
        ] as ContentType[],
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