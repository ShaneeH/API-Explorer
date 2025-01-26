<template>
    <el-button type="primary" @click="sendGET">GET {{ endpointRef }}</el-button>
  
    <div v-if="response.code">
      <p :class="{ 'green-text': response.isSuccess, 'red-text': !response.isSuccess }">
        {{ response.code }} - {{ response.isSuccess ? 'Success' : response.errMessage }}
      </p>
  
      <div v-if="response.isSuccess && response.data"> 
        {{response.data}}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { apiService } from '@/services/methods';
  
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
  });
  
  const sendGET = async () => {
    try {
      const data = await apiService.get(endpointRef.value);
      response.value = {
        data,
        code: 200, // Assuming 200 for success, handle differently if needed
        isSuccess: true,
        errMessage: '',
      };
    } catch (error) {
      response.value = {
        data: null,
        code: error.response?.status || 500,
        isSuccess: false,
        errMessage: error.message || 'An error occurred',
      };
    }
  };
  
  </script>
  
  <style scoped>
  .green-text {
    color: green;
    font-weight: bold;
    font-size: 15px;
  }
  
  .red-text {
    color: red;
    font-weight: bold;
    font-size: 15px;
  }
  </style>