<template>
    <el-row>
        <el-col :span="20">
            <el-form-item label="Name">
                <el-input v-model="name" @input="handleInputChange"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="20">
            <el-form-item label="URL">
                <el-input v-model="url" @input="handleInputChange"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="Method">
                <el-select v-model="method" placeholder="Select Method" @change="handleInputChange">
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
    <el-button type="danger" :disabled="!isChanged" @click="updateMethod">Save Changes</el-button>
    <el-alert type="warning" description="By clicking 'Save Changes', this will make permanent changes to the method."
        show-icon></el-alert>
</template>

<script setup>
import { ref } from 'vue';
import { ElCard, ElRow, ElCol, ElFormItem, ElInput } from 'element-plus';
import 'element-plus/dist/index.css';
import editMethod from '@/config/editMethod';
import editName from '@/config/editName';
import editURL from '@/config/editURL';

const props = defineProps({
    endpoint: {
        type: Object,
        required: true,
    },
});

const name = ref(props.endpoint.name);
const url = ref(props.endpoint.url);
const method = ref(props.endpoint.method);



let isChanged = ref(false);
function handleInputChange() {
    isChanged.value = true;
}
function updateMethod() {


    let collection = localStorage.getItem('selected Collection');
    editURL.updateMethodURL(collection, props.endpoint.name, url.value);
    editMethod.updateMethodType(collection, props.endpoint.name, method.value);
    editName.updateMethodNAME(collection, props.endpoint.name, name.value);

}
</script>
