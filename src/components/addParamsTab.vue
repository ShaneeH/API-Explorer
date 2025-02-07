<template>

    <el-tab-pane label="Query Params">
        <div class="url-preview">
            {{ url_preview }} 
            <el-button @click="addParam">{{ type }}</el-button>
        </div>
        <div>
            <div v-for="(param, index) in params" :key="index" style="max-width: 420px; margin: 10px;">
                <div style="display: flex; gap: 10px;">
                    <el-input v-model="param.name" placeholder="Name" @change="addParamsToURL" />
                    <el-input v-model="param.value" placeholder="Value" @change="addParamsToURL" />
                    <el-button @click="removeParam(index)"><i class="pi pi-trash"></i></el-button>
                </div>
            </div>
            <el-button @click="addParam">Add Param</el-button>
            <el-button @click="addParamsToURL">Set New URL</el-button>
        </div>

    </el-tab-pane>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    url: String,
    type: String,
    params: Array,
    url_preview: String,
});

const emit = defineEmits(['add-param', 'remove-param', 'add-params-to-url']);

// Add a new parameter row
const addParam = () => {
    emit('add-param');
};

// Remove a parameter row by index
const removeParam = (index) => {
    emit('remove-param', index);
};

// Update the URL preview
const addParamsToURL = () => {
    emit('add-params-to-url');
};
</script>

<style scoped>
.url-preview {
    margin-bottom: 15px;
    padding: 5px;
    font-size: 14px;
    font-weight: 600;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #6c96c5;
}
</style>
