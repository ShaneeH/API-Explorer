<template>
    <el-button type="success" @click="sendPOST">{{endpointRef}}</el-button>
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
    <br>


    
    <!-- API Key input -->
    <el-input
      v-model="api_key"
      style="width: 250px"
      placeholder="Enter API Key"
     
    />

    <i class="pi pi-key" style="color: gray; margin-left: 6px; margin-right: 6px;"></i>
  
    <!-- Display the response status -->
    <div v-if="response.code">
      <p :class="{ 'green-text': response.isSuccess, 'red-text': !response.isSuccess }">
        <i v-if="response.isSuccess" class="pi pi-check-square" style="color: greenyellow; margin-right: 6px;"></i>
        <i v-if="!response.isSuccess" class="pi pi-exclamation-triangle" style="color: orangered; margin-right: 4px;"></i>
        {{ response.code }} - {{ response.isSuccess ? 'Success' : response.errMessage }}
  
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
    <br>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { apiService } from '@/services/methods';
  
  let body_type = ref("json"); // Default to JSON
  let req_body = ref(""); // User input request body
  let api_key = ref(""); // User input for API key

  let response = ref({
    code: null,
    isSuccess: false,
    errMessage: '',
    data: null,
    time: null,
  });

  const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const endpointRef = ref(props.endpoint);
  
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
    const startTime = performance.now(); // Start the timer
    
    console.log("User input body: ", req_body.value); // Log the user input
    
    try {
      const formattedBody = formatRequestBody(req_body.value, body_type.value);
  
      // Adding API key to headers
      const headers = {
        'Authorization': `Bearer ${api_key.value}`, // Use the API key for authentication
        'Content-Type': 'application/json', // Assume JSON for simplicity
      };
  
      const apiResponse = await apiService.post(
        endpointRef.value,
        formattedBody,
        body_type.value,
        headers // Pass headers with API key
      );
  
      const endTime = performance.now(); // End the timer
      const responseTime = Math.round(endTime - startTime); // Calculate time in ms
  
      // Set the response data
      response.value = {
        code: apiResponse.status,
        isSuccess: apiResponse.status === 201 || 200,
        errMessage: apiResponse.status !== 201 || 200 ? 'An error occurred.' : '',
        data: apiResponse.data,
        time: responseTime,
      };
  
    } catch (error) {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
  
      response.value = {
        code: 500, // Internal server error by default
        isSuccess: false,
        errMessage: error.message,
        data: null,
        time: responseTime,
      };
  
      console.error('Error in sendPOST:', error.message);
    }
  };
  </script>
  