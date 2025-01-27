<template>
  <h3>Hello</h3>
  <el-alert title="Success alert" type="success" />
  <!-- Use the code block inside <pre> to preserve whitespace and format the code -->
  <pre><code ref="codeElement" class="json">{{ code }}</code></pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import hljs from 'highlight.js'; // Import highlight.js
import 'highlight.js/styles/vs2015.css'; // Use monokai for dark background

 // Import your desired style

const code = ref(`{
  "userId": 1,
  "id": 1,
  "body": "quia et suscipit\nsuscipit recusm est autem sunt rem eveniet architecto"
}
`);

onMounted(() => {
  // Highlight the code when the component is mounted
  const codeElement = document.querySelector('code');
  hljs.highlightElement(codeElement);
});
</script>

