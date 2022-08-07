<script lang="ts">
  import { defineComponent } from "vue";

  import type { WikiText as WikiTextType } from "@/types/WikiPage";
  
  import WikiText from "./WikiText.vue";

  export default defineComponent({
    props: {
      text: {
        type: Array as () => WikiTextType[],
        required: true,
      },
    },
    components: { WikiText }
});
</script>

<template>
  <WikiText :text="text" />
</template>