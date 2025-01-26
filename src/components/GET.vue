<template>
  <el-button type="primary" @click="sendGET">{{ endpointRef }}</el-button>

  <i class="pi pi-pencil" style="color: gray; margin-left: 6px;"></i>

  <div v-if="response.code">
    <p :class="{ 'green-text': response.isSuccess, 'red-text': !response.isSuccess }">
      <i v-if="response.isSuccess" class="pi pi-check-square" style="color: gray; margin-right: 6px; "></i>
      <i v-if="!response.isSuccess" class="pi pi-exclamation-triangle" style="color: gray; margin-right: 4px; "></i>
      {{ response.code }} - {{ response.isSuccess ? 'Success ' : response.errMessage }}

      <!-- Clock icon and response time -->
      <el-divider direction="vertical" />
      <i class="pi pi-clock" style="color: gray; margin-left: 6px;"></i>
      <span v-if="response.time !== null" style="margin-left: 6px;">{{ response.time }} ms</span>
    </p>

    <div v-if="response.isSuccess && response.data">
      <code-highlight language="javascript">
        {{ response.data }}
      </code-highlight>
    </div>
  </div>

  <el-divider border-style="dashed" />
</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '@/services/methods';
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const endpointRef = ref(props.endpoint);

const response = ref({
  data: null,
  code: null,
  isSuccess: null,
  errMessage: null,
  time: null,  // This will store the response time
});

const sendGET = async () => {
  const startTime = performance.now();  // Record start time before the request
  try {
    const data = await apiService.get(endpointRef.value);
    const endTime = performance.now();  // Record end time after the response

    response.value = {
      data,
      code: 200,  // Assuming 200 for success, handle differently if needed
      isSuccess: true,
      errMessage: '',
      time: Math.round(endTime - startTime),  // Calculate time in ms
    };
  } catch (error) {
    const endTime = performance.now();  // Record end time even on error
    response.value = {
      data: null,
      code: error.response?.status || 500,
      isSuccess: false,
      errMessage: error.message || 'An error occurred',
      time: Math.round(endTime - startTime),  // Calculate time in ms
    };
  }
};
</script>

<style scoped>
.green-text {
  color: green;

  font-size: 14px;
}

.red-text {
  color: rgb(248, 69, 24);

  font-size: 14px;
}
</style>