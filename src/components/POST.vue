<template>
    <div style="display: flex; align-items: center; gap: 8px;">
        <el-button :style="{ backgroundColor: 'rgb(53, 150, 102)', borderColor: 'rgb(26, 81, 130)', color: '#ffffff' }"
            @click="sendGET" :loading="loading">
            POST
        </el-button>

        <h3 style="margin: 0;">{{ endpointRef }}</h3>
    </div>
    <div class="api-container">

        <!-- Request Body and Response -->
        <div class="main-content">
            <!-- Request Body -->
            <el-input v-model="req_body" class="request-body" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="Request Body" />
            <!-- Response Display -->
            <div class="response-display">
                <div v-if="response.code">
                    <p :class="{ 'green-text': response.isSuccess, 'red-text': !response.isSuccess }">
                        <i v-if="response.isSuccess" class="pi pi-check-square"
                            style="color: greenyellow; margin-right: 6px;"></i>
                        <i v-if="!response.isSuccess" class="pi pi-exclamation-triangle"
                            style="color: orangered; margin-right: 4px;"></i>
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
            </div>
        </div>
        <el-radio-group v-model="body_type" size="small" class="body-type-selector">
            <el-radio-button label="JSON" value="json" />
            <el-radio-button label="XML" value="xml" />
            <el-radio-button label="YAML" value="yaml" />
            <el-radio-button label="Text" value="text" />
        </el-radio-group>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '@/services/methods';
import CodeHighlight from 'vue-code-highlight/src/CodeHighlight.vue';
import 'vue-code-highlight/themes/duotone-sea.css';

let body_type = ref('json'); // Default to JSON
let req_body = ref(''); // User input request body
let api_key = ref(''); // User input for API key

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

    console.log('User input body: ', req_body.value); // Log the user input

    try {
        const formattedBody = formatRequestBody(req_body.value, body_type.value);

        // Adding API key to headers
        const headers = {
            Authorization: `Bearer ${api_key.value}`, // Use the API key for authentication
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

<style scoped>
.api-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem;
}

.header {
    display: flex;

}

.input-section {

    gap: 1rem;
    align-items: center;


}

.api-key-input {
    margin-left: 50px;
    width: 250px;
}

.body-type-selector {
    flex: 1;
}

.main-content {
    display: flex;
    gap: 1rem;
}

.request-body {
    flex: 1;
}

.response-display {
    flex: 1;
}
</style>
