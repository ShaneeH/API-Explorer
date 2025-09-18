<template>
  <div v-if="response.code && !loading" class="response-status">
    <p :class="responseClass">
      <i :class="responseIconClass" class="response-icon"></i>
      {{ response.code }} - {{ responseMessage }}
      <el-divider direction="vertical" />
      <i class="pi pi-clock"></i>
      <span v-if="response.time !== null">{{ response.time }} ms</span>
    </p>

    <div v-if="response.isSuccess && response.data" class="response-data">
      <code-highlight language="javascript">
        {{ response.data }}
      </code-highlight>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";

const props = defineProps({
  response: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});

const responseClass = computed(() => (props.response.isSuccess ? 'green-text' : 'red-text'));
const responseIconClass = computed(() => (props.response.isSuccess ? 'pi pi-check-square' : 'pi pi-exclamation-triangle'));
const responseMessage = computed(() => (props.response.isSuccess ? 'Success' : props.response.errMessage));
</script>

<style scoped>
.response-status {
  margin-top: 16px;
}

.green-text {
  color: green;
  font-size: 14px;
}

.red-text {
  color: rgb(248, 69, 24);
  font-size: 14px;
}

.response-data {
  margin-top: 8px;
}
</style>
