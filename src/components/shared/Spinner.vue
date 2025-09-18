<template>
  <div v-if="loading" class="spinner">
    <i class="el-icon-loading"></i>
    <span v-if="text" class="ml-2">{{ text }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: { type: Boolean, default: false },
  text: { type: String, default: "" }
});
</script>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 24px;
  color: #409eff; /* Element Plus blue */
}
</style>
