<template>
  
  <div class="request_view" style="margin-left: 12px; margin-right: 12px;">
  <h3> GET ({{ get_qty }}) <el-switch v-model="show_GET" /> </h3>

  <!-- Conditionally render based on switch value -->
  <div v-if="show_GET">
    <div v-for="(endpoint, index) in endPoints.GET_Methods" :key="index">
      <GET :endpoint="endpoint" />
    </div>
  </div>
  <br>

  <h3> POST ({{ post_qty }}) <el-switch v-model="show_POST" class="ml-2" style="--el-switch-on-color: #13ce66;" /> </h3>
  <div v-if="show_POST">
    <div v-for="(endpoint, index) in endPoints.POST_Methods" :key="index">
      <POST :endpoint="endpoint" />
    </div>
  </div>
</div>
 
</template>

<script setup>
import GET from '@/components/GET.vue';
import POST from '@/components/POST.vue';
import { endPoints } from '@/config/endpoints';
import { ref } from 'vue';

const get_qty = ref(endPoints.getMethodsQty);
const post_qty = ref(endPoints.postMethodsQty);

const show_GET = ref(true);
const show_POST = ref(true); 
</script>

<style scoped></style>
