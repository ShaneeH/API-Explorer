<template>
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="Authentication">
        <!-- Mock API key field with button to submit -->
        <el-input v-model="apiKey" placeholder="Enter API Key" />
        <el-button @click="onAuthClick">Submit API Key</el-button>
      </el-tab-pane>
  
      <el-tab-pane v-if="methodType === 'GET'" label="Params">Params</el-tab-pane>
  
      <el-tab-pane v-if="methodType === 'POST'" label="Request Body">
        <textarea v-model="requestBody" placeholder="Enter POST data here..." rows="4"></textarea>
      </el-tab-pane>
  
      <el-tab-pane label="Edit Query">Edit Query</el-tab-pane>
      <el-tab-pane label="Generate Code">Generate Code</el-tab-pane>
    </el-tabs>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  
  const props = defineProps({
    methodType: {  // Type of HTTP request (GET or POST)
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['authClicked']);  // Emitting event on authentication click
  
  const apiKey = ref("");  // Holds API Key for Authentication
  const requestBody = ref("");  // Holds POST data
  
  // When API key is submitted
  const onAuthClick = () => {
    emit('authClicked', apiKey.value);  // Emit API key to parent (GET.vue)
  };
  </script>
  
  <style scoped > 
  @import './../assets/styles/optionsMenu_style.css'; 
  </style>
  