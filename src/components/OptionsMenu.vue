<template>
    
    <el-tabs :tab-position="'left'" style=" width: 600px; " class="custom-tabs">
        
        <!-- ADD PARAMS TAB -->
        <el-tab-pane label="Add Params">
            URL Preview : {{ url_preview}}
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

        <el-tab-pane label="Edit Query">Edit Query - Change Method</el-tab-pane>
        <el-tab-pane label="Generate Code">Generate Code</el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const uri = ref('');
const params = ref([{ name: '', value: '' }]);
const requestBody = ref('');
const methodType = ref('GET'); // Assuming default method type is GET
const url_preview = ref('');

const addParam = () => {
    params.value.push({ name: '', value: '' });
};

const removeParam = (index) => {
    params.value.splice(index, 1);
    addParamsToURL();
};

const printArrays = () => {
    console.log(params.value);
};

const addParamsToURL = () => {
    const url = new URL('http://example.com');
    params.value.forEach(param => {
        if (param.name && param.value) {
            url.searchParams.append(param.name, param.value);
        }
    });
    console.log(url.toString());
   url_preview.value = url.toString();
};
</script>

<style>
/* Style tab labels */
.custom-tabs .el-tabs__item {
  font-size: 15px; /* Increase font size */
  font-weight: bold; /* Make text bold */
  color: #7e7e7e; /* Change text color */
  padding: 12px; /* Add padding for spacing */
}

.custom-tabs .el-tabs__item.is-active {
  color: #4a90e2; /* Highlight active tab */
  /* Optional: Add an indicator for active tabs */
}
</style>