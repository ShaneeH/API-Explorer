<template>
  <h3>
    GET  ({{ qty }})
    <el-switch v-model="value1" />
  </h3>
  
  <!-- Conditionally render based on switch value -->
  <div v-if="value1" v-for="(endpoint, index) in endPoints.GET_Methods" :key="index">
    <GET :endpoint="endpoint" />
  </div>
</template>

<script setup>
import GET from '@/components/GET.vue';
import { endPoints } from '@/config/endpoints';
import { ref } from 'vue';

const qty = ref(endPoints.getMethodsQty);
const value1 = ref(true); // This controls the visibility based on the switch
</script>

<style scoped></style>
