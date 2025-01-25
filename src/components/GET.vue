<template>
    <h4>{{ endpointRef }}</h4>
    <button @click="sendGET()">Test Endpoint</button>
  
    <p v-if="response.data">{{ response.data }}</p>
  
    <div v-if="response.code">
      <p :class="response.isSuccess ? 'green-text' : 'red-text'">
        {{ response.code }} - {{ response.isSuccess ? 'Success' : response.errMessage }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { apiService } from '@/services/methods';
  
  // Define the prop
  const props = defineProps({
    endpoint: {
      type: String,
      required: true,
    },
  });
  
  // Create a reactive reference from the prop value
  const endpointRef = ref(props.endpoint);
  
  const response = ref({
    data: null,
    code: null,
    isSuccess: null,
    errMessage: null,
  });
  
  const sendGET = async () => {
    try {
      // Call the API service with the reactive endpoint reference
      const data = await apiService.get(endpointRef.value);
  
      // Update the response with the fetched data
      response.value = {
        data: data,
        code: 200, // Assuming 200 for success, handle differently if needed
        isSuccess: true,
        errMessage: '',
      };
    } catch (error) {
      // Handle error and update the response accordingly
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
    font-size: 21px;
  }
  
  .red-text {
    color: red;
    font-weight: bold;
    font-size: 21px;
  }
  </style>
  