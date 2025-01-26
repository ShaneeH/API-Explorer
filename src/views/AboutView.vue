<template>
    <h2>vue-code-highlight example</h2>
    <code-highlight language="javascript">
      {
  "id": 10,
  "petId": 198772,
  "quantity": 7,
  "shipDate": "2025-01-26T00:03:04.949Z",
  "status": "approved",
  "complete": true
}
    </code-highlight>
</template>

<script setup>
import { ref, computed } from 'vue';
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";



</script>