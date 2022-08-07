<script lang="ts">
  import { mapWritableState } from "pinia";
  import { defineComponent } from "vue";
  import { useProgressStore } from "../../stores/progress";

  type EpisodesMap = { [key: number]: Number };

  export default defineComponent({
    data() {
      return {
        totalSeasons: 3 as Number,
        seasonEpisodes: 13 as Number | EpisodesMap,
      };
    },
    computed: {
      ...mapWritableState(useProgressStore, ['season', 'episode']),
      totalEpisodes(): number {
        if (typeof this.seasonEpisodes === "number") {
          return this.seasonEpisodes.valueOf();
        }

        type EpisodesMapKey = keyof typeof this.seasonEpisodes;
        return this.seasonEpisodes[this.season as EpisodesMapKey];
      }
    },
  });
</script>

<template>
  <div>
    <div id="slider-container">
      <input class="wiki-slider" v-model="season" type="range" min="1" :max="totalSeasons.valueOf()" />
      <div class="slider-labels">
        <p class="slider-label-item" v-for="i in totalSeasons">{{ i }}</p>
      </div>
      
      <input class="wiki-slider" v-model="episode" type="range" min="0" :max="totalEpisodes.valueOf()" />
      <div class="slider-labels">
        <p class="slider-label-item" v-for="(n, i) in totalEpisodes.valueOf() + 1">{{ i }}</p>
      </div>
    </div>
  </div>
</template>

<style>
  .wiki-slider {
    width: 100%;
  }

  .slider-labels {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .slider-label-item {
    width: 20px;
    text-align: center;
  }
</style>