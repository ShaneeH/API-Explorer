<template>

    <el-tabs :tab-position="'left'" style=" width: 600px; " class="custom-tabs">

        <!-- ADD PARAMS TAB -->
        <el-tab-pane label="Add Params">
            <div class="url-preview">
                preview:{{ url_preview }}
            </div>
            <div>
                <div v-for="(param, index) in params" :key="index" style="max-width: 420px; margin: 10px;">
                    <div style="display: flex; gap: 10px;">
                        <el-input @change="addParamsToURL" v-model="param.name" placeholder="Name" />
                        <el-input @change="addParamsToURL" v-model="param.value" placeholder="Value" />
                        <el-button @click="removeParam(index)"><i class="pi pi-trash"></i></el-button>
                    </div>
                </div>
                <el-button @click="addParam">Add Param</el-button>
                <el-button @click="addParamsToURL">Set New URL</el-button>
            </div>
            <br />

        </el-tab-pane>
        <!-- END OF ADD PARAMS TAB -->

        <el-tab-pane v-if="methodType === 'POST'" label="Request Body">
            <textarea v-model="requestBody" placeholder="Enter POST data here..." rows="4"></textarea>
        </el-tab-pane>

        <!-- EDIT QUERY TAB -->
        <el-tab-pane label="Edit Query">Edit Query - Change Method</el-tab-pane>

        <!-- GENERATE CODE TAB -->
        <el-tab-pane label="Generate Code">Generate Code</el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const url = ref(props.endpoint);
const params = ref([{ name: '', value: '' }]);
const requestBody = ref('');
const methodType = ref('GET'); // Default method type
const url_preview = ref('');

// Add a new parameter row
const addParam = () => {
  params.value.push({ name: '', value: '' });
};

// Remove a parameter row by index
const removeParam = (index) => {
  params.value.splice(index, 1);
  updateURLPreview(); // Update URL preview after removal
};

// Update the URL preview whenever params change
const updateURLPreview = () => {
  try {
    const urlObject = new URL(url.value); // Create URL object
    urlObject.search = ''; // Clear previous search params

    // Append valid params to the URL
    params.value.forEach((param) => {
      if (param.name && param.value) {
        urlObject.searchParams.append(param.name, param.value);
      }
    });

    url_preview.value = urlObject.toString(); // Update preview
  } catch (error) {
    console.error('Invalid URL:', error);
  }
};

// Watch for changes in params and update URL preview
watch(params, updateURLPreview, { deep: true });
</script>

<style>
/* Style tab labels */
.custom-tabs .el-tabs__item {
    font-size: 15px;
    /* Increase font size */
    font-weight: bold;
    /* Make text bold */
    color: #7e7e7e;
    /* Change text color */
    padding: 12px;
    /* Add padding for spacing */
}

.custom-tabs .el-tabs__item.is-active {
    color: #4a90e2;
    /* Highlight active tab */
    /* Optional: Add an indicator for active tabs */
}

.url-preview {    
    margin-bottom: 15px;
    padding: 5px;  
    font-size: 15px;
    font-weight:600;
    font-family: Verdana, Geneva, Tahoma, sans-serif; 
    color: #4b92e3;  
}
</style>