<!-- src/components/shared/Spinner.vue -->
<template>
  <div v-if="loading" class="spinner">
    <el-icon class="is-loading">
      <Loading />
    </el-icon>
    <span v-if="text" class="ml-2">{{ text }}</span>
  </div>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  text: { type: String, default: '' },
})
</script>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #409eff;
}
.is-loading {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
