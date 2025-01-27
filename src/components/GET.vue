<template>
  <div style="display: flex; align-items: center; gap: 8px;">
    <el-button :style="{ backgroundColor: 'rgb(103, 160, 214', borderColor: 'rgb(26, 81, 130)', color: '#ffffff' }"
      @click="sendGET" :loading="loading">
      {{ loading ? 'Loading...' : get }}
    </el-button>

    <h2 style="margin: 0;">{{ endpointRef }}</h2>
    <div v-if="displayOptions == false">
      <i class="pi pi-cog" style="color: gray; margin-left: 8px; cursor: pointer; font-size: 21px;"
        @click="showOptions"></i>
    </div>

    <div v-if="displayOptions == true">
      <i class="pi pi-sort-amount-up" style="color: gray; margin-left: 8px; cursor: pointer; font-size: 21px;"
        @click="showOptions"></i>
    </div>



  </div>

  <!-- The GREEN OR RED TEXT DEPENDING ON THE RESPONSE OF THE API -->
  <div v-if="response.code && !loading">
    <p :class="{ 'green-text': response.isSuccess, 'red-text': !response.isSuccess }">
      <i v-if="response.isSuccess" class="pi pi-check-square" style="color: gray; margin-right: 6px; "></i>

      <i v-if="!response.isSuccess" class="pi pi-exclamation-triangle" style="color: gray; margin-right: 4px; "></i>
      {{ response.code }} - {{ response.isSuccess ? 'Success ' : response.errMessage }}

      <!-- Clock icon and response time -->
      <el-divider direction="vertical" />
      <i class="pi pi-clock" style="color: gray; margin-left: 6px;"></i>
      <span v-if="response.time !== null" style="margin-left: 6px;">{{ response.time }} ms</span>
    </p>
    <i v-if="response.isSuccess" class="pi pi-copy" style="color: gray; margin-right: 6px; "></i>
    <!-- The API RESPONSE DISPLAY -->
    <div v-if="response.isSuccess && response.data">
      <code-highlight language="javascript">
        {{ response.data }}
      </code-highlight>
    </div>
  </div>

  <br><br>
  <!-- The Options Menu -->
  <div v-if="displayOptions">
    <OptionsMenu :methodType="'GET'" @authClicked="handleAuthClick" />
  </div>

  <el-divider border-style="dashed" />
</template>

<script setup>
import { ref } from 'vue';
import { apiService } from '@/services/methods';
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import OptionsMenu from '@/components/OptionsMenu.vue';

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
});

const endpointRef = ref(props.endpoint);
const get = ref('GET');
const displayOptions = ref(false);
const loading = ref(false); // Track loading state

const response = ref({
  data: null,
  code: null,
  isSuccess: null,
  errMessage: null,
  time: null,  // This will store the response time
});

const sendGET = async () => {
  loading.value = true; // Set loading to true when request starts
  try {
    response.value = await apiService.get(endpointRef.value);
  } catch (error) {
    response.value = { isSuccess: false, errMessage: error.message };
  } finally {
    loading.value = false; // Set loading to false when request finishes
  }
};

const showOptions = () => {
  displayOptions.value = !displayOptions.value;
  console.log(displayOptions.value);
};

const handleAuthClick = (apiKey) => {
  console.log('API Key entered:', apiKey);  // Log the entered API key to console
};
</script>

<style scoped>
.green-text {
  color: green;
  font-size: 14px;
}

.red-text {
  color: rgb(248, 69, 24);
  font-size: 14px;
}
</style>
