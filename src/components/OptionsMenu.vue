<template>
    <el-tabs>
        <!-- ADD PARAMS TAB -->
        <el-tab-pane label="Add Params">
            {{ uri }}
            <div>
                <div v-for="(param, index) in params" :key="index" style="max-width: 420px; margin: 10px;">
                    <div style="display: flex; gap: 10px;">
                        <el-input v-model="param.name" placeholder="Name" />
                        <el-input v-model="param.value" placeholder="Value" />
                        <el-button  @click="removeParam(index)"><i class="pi pi-trash"></i></el-button>
                    </div>
                </div>
                <el-button @click="addParam">Add Param</el-button>
                <el-button @click="addParamsToURL">Set New URL</el-button>
            </div>
            <br>
            <button @click="printArrays">Print Arrays</button>
            <button @click="addParamsToURL">Print URL</button>
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

const uri = ref('');
const params = ref([{ name: '', value: '' }]);
const requestBody = ref('');
const methodType = ref('GET'); // Assuming default method type is GET

const addParam = () => {
    params.value.push({ name: '', value: '' });
};

const removeParam = (index) => {
    params.value.splice(index, 1);
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
    uri.value = url.toString();
};
</script>

<style scoped>
/* Add your styles here */
</style>