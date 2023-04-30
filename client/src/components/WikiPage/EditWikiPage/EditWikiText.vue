<script lang="ts">
  import { defineComponent } from "vue";

  import type { WikiText } from "@wws/shared/src/types/WikiPageTypes";
  import { convertToTextArray } from "@/utils/wikiText";

  export default defineComponent({
    props: {
      component: {
        type: String,
        required: true,
      },
      text: {
        type: Array as () => WikiText[],
        required: true,
      },
    },
    computed: {
      textHtmlArray(): String[] {
        return convertToTextArray(this.text);
      },
    },
  });
</script>

<template>
  <div v-for="sentence in textHtmlArray" class="flex-container">
    <component :is="component" v-bind="{ ...$attrs }">
      <sup class="edit-icon"><i class="fa-solid fa-pen-to-square"></i></sup>
      {{ sentence }}
    </component>
  </div>
</template>

<style>
  .edit-icon {
    font-size: 12px;
    margin-left: 5px;
  }
</style>
