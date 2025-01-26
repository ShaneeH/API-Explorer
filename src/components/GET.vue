<template>
  <el-button type="primary" @click="sendGET">GET {{ endpointRef }}</el-button>

  <div v-if="response.code">

    <p :class="{ 'green-text': response.isSuccess, 'red-text': !response.isSuccess }">
      <i v-if="response.isSuccess" class="pi pi-check-square" style="color: green; margin-right: 6px; "></i>
      <i v-if="!response.isSuccess" class="pi pi-exclamation-circle" style="color: orangered; margin-right: 6px; "></i>
      {{ response.code }} - {{ response.isSuccess ? 'Success ' : response.errMessage }}
      
    </p>
    
    <div v-if="response.isSuccess && response.data">
      {{ response.data }}
    </div>
  </div>

  <el-divider border-style="dashed" />

</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '@/services/methods';
import { Search, Close } from '@element-plus/icons-vue';



const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const endpointRef = ref(props.endpoint);

const response = ref({
  data: null,
  code: null,
  isSuccess: null,
  errMessage: null,
});

const sendGET = async () => {
  try {
    const data = await apiService.get(endpointRef.value);
    response.value = {
      data,
      code: 200, // Assuming 200 for success, handle differently if needed
      isSuccess: true,
      errMessage: '',
    };
  } catch (error) {
    response.value = {
      data: null,
      code: error.response?.status || 500,
      isSuccess: false,
      errMessage: error.message || 'An error occurred',
    };
  }
};



</script>

<style scoped>
.green-text {
  color: green;
  font-weight: bold;
  font-size: 15px;
}

.red-text {
  color: rgb(248, 69, 24);
  font-weight: bold;
  font-size: 15px;
}
</style>