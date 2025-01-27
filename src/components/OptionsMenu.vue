<template>
    <el-tabs type="border-card" class="demo-tabs">
        <!-- AUTHENTICATION  TAB -->
        <el-tab-pane label="Authentication">
            <el-input v-model="apiKey" placeholder="Enter API Key"
                style="max-width: 300px; width: 100%; margin-right: 10px;" />
            <el-button type="warning" @click="onAuthClick" text bg>Add Key</el-button>
        </el-tab-pane>
        <!-- END OF AUTHENTICATION TAB -->

        <!-- ADD PARAMS TAB -->
        <el-tab-pane v-if="methodType === 'GET'" label="Params">
            <el-button type="warning" @click="addParams" text bg>Add New Param</el-button>
            <div v-if="paramsNum > 0">
                <div v-for="( index) in paramsNum" :key="index">
                    <el-input v-model="apiKey" placeholder="name"
                        style="max-width: 180px; width: 100%; margin-right: 10px;" />
                    <el-input v-model="apiKey" placeholder="value"
                        style="max-width: 180px; width: 100%; margin-right: 10px;" />
                    <button>Set</button>
                </div>
            </div>
        </el-tab-pane>
        <br>
        <!-- END OF ADD PARAMS TAB -->



        <el-tab-pane v-if="methodType === 'POST'" label="Request Body">
            <textarea v-model="requestBody" placeholder="Enter POST data here..." rows="4"></textarea>
        </el-tab-pane>

        <el-tab-pane label="Edit Query">Edit Query - Change Method

        </el-tab-pane>
        <el-tab-pane label="Generate Code">Generate Code</el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { ref } from 'vue';

const paramsNum = ref(0);
const params = ref([]);

function addParams() {
    paramsNum.value = paramsNum.value + 1;
}

function setParams() {
    //We send the params back to the GET Component 
}



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

<style scoped>
@import './../assets/styles/optionsMenu_style.css';
</style>