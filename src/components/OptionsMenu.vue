<template>
    <el-tabs type="border-card" class="demo-tabs" style="max-width: 550px; width: 100%; margin-right: 10px;">
        <!-- AUTHENTICATION  TAB -->
        <el-tab-pane label="Authentication">
            <el-input v-model="apiKey" placeholder="Enter API Key"
                style="max-width: 300px; width: 100%; margin-left: 10px;" />
            <el-button type="warning" @click="onAuthClick" text bg>Add Key</el-button>
        </el-tab-pane>
        <!-- END OF AUTHENTICATION TAB -->

        <!-- ADD PARAMS TAB -->
        <el-tab-pane v-if="methodType === 'GET'" label="Params">
            {{ display }}
            <el-button type="warning" @click="addParams" text bg>Add New Param</el-button>
            <div v-if="paramsNum > 0">
                <br>
                <div v-for="( index) in paramsNum" :key="index">
                    <el-input v-model="params[index - 1].name" placeholder="name"
                        style="max-width: 180px; width: 100%; margin-right: 10px;" />
                    <el-input v-model="params[index - 1].value" placeholder="value"
                        style="max-width: 180px; width: 100%; margin-right: 10px;" />
                    <el-button @click="setParams(index)">Set</el-button>
                    <i class="pi pi-trash"
                        style="color: gray; margin-left: 10px; cursor: pointer; font-size: 14px;"></i>

                </div>

            </div>
            <br>
            <br>
            <br>
            <button @click="printArrays">print arrays</button>
            <button @click="addParamstoURL">print URL</button>
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
const params = ref([{ name: '', value: '' }]);
const params_total = ref([]);
const url = ref('http://apiexample/people/');
const display = ref('');


function addParams() {
    params.value.push([{ name: '', value: '' }]);
    paramsNum.value = paramsNum.value + 1;

}

function setParams(index) {


    //WE Set Param to the Text Field INDEX 

    let name = params.value[index - 1].name;
    let value = params.value[index - 1].value;
    let param = `${name}=${value}`;

    console.log(`At field ${index} : ${param}`);
    //Add it to the Array
    params_total.value[index - 1] = param;

}



function printArrays() {

    console.log('LOOPING PARAM ARRAY');
    params.value.forEach((param, index) => {
        console.log(`Param ${index + 1}:`);
        console.log(`Name: ${param.name}`);
        console.log(`Value: ${param.value}`);

    });
    console.log('***********')

    console.log('LOOPING PARAM_TOTAL ARRAY');
    // Loop through the 'params_total' array
    params_total.value.forEach((param, index) => {
        console.log(`Param ${index + 1}: ${param}`);
    });

}


function addParamstoURL() {
    console.log('addParams hit');


     let s = '';

    //If its not the last param to be added we add a & at the end
    for (let i = 0; i < params_total.value.length; i++) {
      
            let str = params_total.value[i] + '&';
            s = s + str;
        

    }



    let x = url.value + '?' + s;
    display.value = x;
    console.log(x); // This is your query string

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