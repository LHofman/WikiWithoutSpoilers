<script lang="ts">
  import cloneDeep from "lodash/cloneDeep";
  import { defineComponent } from "vue";

  import type { WikiText } from "@wws/shared/src/types/WikiPageTypes";
  import { convertToText } from "@/utils/wikiText";

  export default defineComponent({
    props: {
      originalText: {
        type: Array as () => WikiText[],
        required: true,
      },
    },
    data() {
      return {
        text: cloneDeep(this.originalText) as WikiText[],
      };
    },
    computed: {
      fullText(): string {
        return convertToText(this.originalText);
      },
    },
    methods: {
      updateText(event: Event, idx: number): void {
        const textInput = Object.assign({}, this.text[idx]);
        textInput.text = (event.target as HTMLInputElement).value;
        this.text[idx] = textInput;
      },
    },
  });
</script>

<template>
  <p>Wiki Text Input</p>

  <p>{{ fullText }}</p>

  <div v-for="(_, idx) in text">
    Text: <input class="input-text" v-model="text[idx].text"/><br/>
    Season: <input class="input-progress" type="number" v-model="text[idx].season" min="0"/><br/>
    Episode: <input class="input-progress" type="number" v-model="text[idx].episode" min="0"/><br/>
  </div>
</template>

<style>
  .input-text {
    width: 90%;
  }

  .input-progress {
    width: 40px;
  }
</style>