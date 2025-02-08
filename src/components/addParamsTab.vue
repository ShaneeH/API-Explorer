<template>
    <div class="request-builder">
   
        <div class="url-display">
          
          <el-tag  size="large" type="primary"  effect="dark"  ><h4>{{ fullUrl }}</h4></el-tag>
          <el-button  @click="sendParams">{{ endpoint.method }}</el-button>
        </div>
  
        <el-row justify="space-between" class="controls">
          <el-button type="success" @click="addParam" plain>+ Add Param</el-button>
        </el-row>
  
        <el-form>
          <el-row  v-for="(param, index) in queryParams" :key="index"class="param-row"  align="middle" gutter="10" >
            <el-col :span="8">
              <el-input v-model="param.name" placeholder="Name" clearable />
            </el-col>
            <el-col :span="8">
              <el-input v-model="param.value" placeholder="Value" clearable />
            </el-col>
            <el-col :span="4">
              <el-button type="danger" @click="removeParam(index)" plain>-</el-button>
            </el-col>
          </el-row>
        </el-form>
   
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import qs from "qs";
  
  const props = defineProps({
    endpoint: {
      type: Object,
      required: true,
    },
  });
  
  const queryParams = ref([{ name: "", value: "" }]);
  
  const addParam = () => queryParams.value.push({ name: "", value: "" });
  const removeParam = (index) => queryParams.value.splice(index, 1);
  
  const fullUrl = computed(() => {
    const params = queryParams.value
      .filter((p) => p.name && p.value)
      .reduce((acc, p) => ({ ...acc, [p.name]: p.value }), {});
  
    return props.endpoint.url + qs.stringify(params, { addQueryPrefix: true });
  });
  
  const sendParams = () => {
    console.log(`Sending request: ${props.endpoint.method} ${fullUrl.value}`);
  };
  </script>
  
  <style scoped>
  .request-builder {

    margin: auto;
  }
  
  .url-display {
    margin-bottom: 10px;
    text-align: center;
 
  }
  
  .controls {
    margin-bottom: 15px;
  }
  
  .param-row {
    margin-bottom: 10px;
  }
  </style>
  