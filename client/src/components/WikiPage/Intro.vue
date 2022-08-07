<script lang="ts">
  export default {
    props: {
      text: String
    }
  }
</script>

<template>
  <p v-html="text" />
</template>