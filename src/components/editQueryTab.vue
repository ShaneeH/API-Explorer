<template>
   
        <el-row>
            <el-col :span="20">
                <el-form-item label="Name">
                    <el-input v-model="endpoint.name" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="URL">
                    <el-input v-model="endpoint.url" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="20">
                <el-form-item label="Method">
                    <el-select v-model="endpoint.method" placeholder="Select Method">
                        <el-option label="GET" value="GET"></el-option>
                        <el-option label="POST" value="POST"></el-option>
                        <el-option label="PUT" value="PUT"></el-option>
                        <el-option label="DELETE" value="DELETE"></el-option>
                        <el-option label="PATCH" value="PATCH"></el-option>
                        <el-option label="OPTIONS" value="OPTIONS"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-button>Save Changes</el-button>

    
</template>

<script setup>
import { ElCard, ElRow, ElCol, ElFormItem, ElInput } from 'element-plus';
import 'element-plus/dist/index.css';

const props = defineProps({
    endpoint: {
        type: Object,
        required: true,
    },
});
</script>