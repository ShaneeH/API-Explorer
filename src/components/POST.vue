<template>
    <el-button type="success" @click="sendPOST">Send POST Request</el-button>
    <br>
    <br>
  
    <el-input
      v-model="req_body"
      style="width: 650px"
      :autosize="{ minRows: 4, maxRows: 8 }"
      type="textarea"
      placeholder="Request Body"
    />
    <br><br>
    <el-radio-group v-model="body_type" size="small">
      <el-radio-button label="JSON" value="json" />
      <el-radio-button label="XML" value="xml" />
      <el-radio-button label="YAML" value="yaml" />
      <el-radio-button label="Text" value="text" />
    </el-radio-group>
    <br>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { apiService } from '@/services/methods';
  
  let body_type = ref("json"); // Default to JSON
  let req_body = ref("");
  let req = ref(`{
    "title": "foo",
    "body": "bar",
    "userId": 1
  }`); // Default JSON request body
  
  const formatRequestBody = (body, type) => {
    switch (type) {
      case 'json':
        return JSON.parse(body); // Ensure JSON object
      case 'xml':
        return body; // XML is typically sent as a string
      case 'yaml':
        return body; // YAML can also be sent as plain text
      case 'text':
        return body; // Plain text
      default:
        throw new Error('Unsupported body type');
    }
  };
  
  const sendPOST = async () => {
    try {
      const formattedBody = formatRequestBody(req.value, body_type.value);
  
      const response = await apiService.post(
        'https://jsonplaceholder.typicode.com/posts',
        formattedBody,
        body_type.value
      );
  
      console.log('POST Response:', response);
      return response; // For further processing if needed
    } catch (error) {
      console.error('Error in sendPOST:', error.message);
  
      if (error.message === 'Network Error') {
        console.error('Please check your network connection or the API endpoint.');
      }
  
      return { success: false, error: error.message }; // Graceful fallback
    }
  };
  </script>
  