<template>
  <Requests />

  <h3>GET Requests</h3>
  <div v-for="(endpoint, index) in endPoints.GET_Methods" :key="index">
  <GET :endpoint="endpoint" />
</div>

</template>

<script setup>
import Requests from '@/components/Requests.vue';
import GET from '@/components/GET.vue';
import { endPoints } from '@/config/endpoints';
import { ref } from 'vue';




</script>


<style scoped></style>
