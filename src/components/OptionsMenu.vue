<template>
  <el-tabs :tab-position="'left'" style=" width: 600px; " class="custom-tabs">
      <!-- ADD PARAMS TAB -->
      <add-params-tab 
          :url="url" 
          :type="methodType"
          :params="params" 
          :url_preview="url_preview" 
          @add-param="addParam" 
          @remove-param="removeParam" 
          @add-params-to-url="updateURLPreview" 
      />

      <!-- Request Body Tab -->
      <el-tab-pane v-if="methodType === 'POST'" label="Request Body">
          <textarea v-model="requestBody" placeholder="Enter POST data here..." rows="4"></textarea>
      </el-tab-pane>

      <!-- Edit Query Tab -->
      <el-tab-pane label="Edit Query">
          Edit Query - Change Method
      </el-tab-pane>

      <!-- Generate Code Tab -->
      <el-tab-pane label="Generate Code">
          Generate Code
      </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, watch } from 'vue';
import AddParamsTab from './addParamsTab.vue';

const props = defineProps({
  //This objects contains [name url method]
  endpoint: {
    type: Object,
    required: true,
  },
});

const url = ref(props.endpoint.url);
const params = ref([{ name: '', value: '' }]);
const requestBody = ref('');
const methodType = ref(props.endpoint.metod); // Default method type
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

<style scoped>
.custom-tabs .el-tabs__item {
  font-size: 15px;
  font-weight: bold;
  color: #7e7e7e;
  padding: 12px;
}

.custom-tabs .el-tabs__item.is-active {
  color: #4a90e2;
}

.url-preview {
  margin-bottom: 15px;
  padding: 5px;
  font-size: 15px;
  font-weight: 600;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #4b92e3;
}
</style>
