<template>
  <div class="header">
    <el-button :style="buttonStyle" @click="sendGET" :loading="loading">
      {{ loading ? 'Loading...' : 'GET' }}
    </el-button>

    <h3>{{ endpoint.name}} - {{ endpoint.url }}</h3> 

    <i
      :class="optionsIconClass"
      class="options-icon"
      @click="toggleOptions"
    ></i>
  </div>

  <div v-if="response.code && !loading" class="response-status">
    <p :class="responseClass">
      <i :class="responseIconClass" class="response-icon"></i>
      {{ response.code }} - {{ responseMessage }}
      <el-divider direction="vertical" />
      <i class="pi pi-clock"></i>
      <span v-if="response.time !== null">{{ response.time }} ms</span>
    </p>

    <div v-if="response.isSuccess && response.data" class="response-data">
      <code-highlight language="javascript">
        {{ response.data }}
      </code-highlight>
    </div>
  </div>

  <div v-if="displayOptions" class="options-menu">
    <OptionsMenu :methodType="'GET'" :endpoint="endpoint" @authClicked="handleAuthClick" />
  </div>

  <el-divider border-style="dashed" />
</template>

<script setup>
import { ref, computed } from 'vue';
import { apiService } from '@/services/methods';  // Ensure this is correctly defined
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import OptionsMenu from '@/components/OptionsMenu.vue';

const props = defineProps({
  //This objects contains [name url method]
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

const responseClass = computed(() => (response.value.isSuccess ? 'green-text' : 'red-text'));
const responseIconClass = computed(() => (response.value.isSuccess ? 'pi pi-check-square' : 'pi pi-exclamation-triangle'));
const responseMessage = computed(() => (response.value.isSuccess ? 'Success' : response.value.errMessage));
const optionsIconClass = computed(() => (displayOptions.value ? 'pi pi-sort-amount-up' : 'pi pi-cog'));

const sendGET = async () => {
  console.log(props.endpoint);
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