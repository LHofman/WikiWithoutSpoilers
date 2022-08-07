<script lang="ts">
import type { Content } from "@/types/WikiPage";
import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      content: Array as () => Content[],
      headerTagNumber: {
        type: Number,
        default: 2,
      },
    },
    computed: {
      headerTag(): String {
        return `h${this.headerTagNumber}`;
      },
      isMainHeader(): Boolean {
        return this.headerTagNumber === 2;
      },
      nextHeaderTagNumber(): Number {
        return this.headerTagNumber + 1;
      },
    }
  });
</script>

<template>
  <div>
    <div :class="{ mainHeader: isMainHeader, subHeader: !isMainHeader }" v-for="section in content">
      <component :is="headerTag">{{ section.title }}</component>
      <hr v-if="isMainHeader"/>
      <p v-if="section.text">{{ section.text }}</p>
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