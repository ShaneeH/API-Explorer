<template>
    <h3>C# API Tester</h3>
    <button @click="testAPI">Click to test API</button>
    
    <p v-if="response.fact">{{ response.fact }}</p>
  
    <div v-if="response.code">
      <p :class="response.isSuccess ? 'green-text' : 'red-text'">
        {{ response.code }} - {{ response.isSuccess ? 'Success' : response.errMessage }}
      </p>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  
  const url = 'https://catfact.ninja/fact';
  const response = ref({
    fact: '',
    code: null,
    isSuccess: null,
    errMessage: ''
  });
  
  function testAPI() {
    axios.get(url)
      .then(apiResponse => {
        const { fact } = apiResponse.data;
        const { status: code } = apiResponse;
  
        response.value = {
          fact,
          code,
          isSuccess: code === 200,
          errMessage: ''
        };
      })
      .catch(error => {
        const errMessage = error.response?.data?.err?.message || error.message;
  
        response.value = {
          fact: '',
          code: error.response?.status || 404,
          isSuccess: false,
          errMessage
        };
      });
  }
  </script>
  
  <style scoped>
  .green-text {
    color: rgb(51, 143, 51);
    font-weight: bold;
    font-size: 21px;
  }
  
  .red-text {
    color: rgb(214, 54, 54);
    font-weight: bold;
    font-size: 21px;
  }
  </style>
  