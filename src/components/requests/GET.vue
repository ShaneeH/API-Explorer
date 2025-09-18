<template>
  <div class="header">
    <el-button :style="buttonStyle" @click="sendGET" :loading="loading">
      {{ loading ? 'Loading...' : 'GET' }}
    </el-button>

    <h3>{{ endpoint.name }} - {{ endpoint.url }}</h3> 

    <i
      :class="optionsIconClass"
      class="options-icon"
      @click="toggleOptions"
    ></i>
  </div>

  <!-- Use the new component -->
  <API_Response :response="response" :loading="loading" />

  <div v-if="displayOptions" class="options-menu">
    <OptionsMenu :methodType="'GET'" :endpoint="endpoint" @authClicked="handleAuthClick" />
  </div>

  <el-divider border-style="dashed" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiService } from '@/services/methods';
import OptionsMenu from '@/components/OptionsMenu.vue';
import API_Response from '../shared/API_Response.vue';

const props = defineProps({
  endpoint: {
    type: Object,
    required: true,
  },
});

const displayOptions = ref(false);
const loading = ref(false);

const response = ref({
  data: null,
  code: null,
  isSuccess: null,
  errMessage: null,
  time: null,
});

const buttonStyle = {
  backgroundColor: 'rgb(103, 160, 214)',
  borderColor: 'rgb(26, 81, 130)',
  color: '#ffffff',
};

const optionsIconClass = computed(() => (displayOptions.value ? 'pi pi-sort-amount-up' : 'pi pi-cog'));

const sendGET = async () => {
  loading.value = true;
  try {
    response.value = await apiService.get(props.endpoint.url);
  } catch (error) {
    response.value = { isSuccess: false, errMessage: error.message };
  } finally {
    loading.value = false;
  }
};

const toggleOptions = () => {
  displayOptions.value = !displayOptions.value;
};

const handleAuthClick = (apiKey) => {
  console.log('API Key entered:', apiKey);
};
</script>

<style scoped>
@import '../../assets/styles/GET_style.css'; 
</style>
