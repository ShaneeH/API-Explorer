<template>
  <div class="collection-container">
    <div class="header">
      <h3 class="selected-collection">
        Collection Selected: <span>{{ selectedCollection || 'None' }}</span>
      </h3>
      <el-button type="primary" @click="toggleDrawer">Manage Collections</el-button>
    </div>

    <!-- Drawer -->
    <Drawer v-model:showDrawer="showDrawer" />

    <!-- Requests View -->
    <div class="request-view">
      <!-- GET Requests -->
      <div class="request-section">
        <h3 class="request-title">
          GET ({{ GET_Requests.length }})
          <el-switch v-model="show_GET" />
        </h3>
        <div v-if="show_GET" class="request-list">
          <GET v-for="(endpoint, index) in GET_Requests" :key="endpoint.name + index" :endpoint="endpoint" />
        </div>
      </div>

      <!-- POST Requests -->
      <div class="request-section">
        <h3 class="request-title">
          POST ({{ POST_Requests.length }})
          <el-switch v-model="show_POST" class="ml-2" style="--el-switch-on-color: #13ce66;" />
        </h3>
        <div v-if="show_POST" class="request-list">
          <POST v-for="(endpoint, index) in POST_Requests" :key="endpoint.name + index" :endpoint="endpoint" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import GET from '@/components/requests/GET.vue';
import POST from '@/components/requests/POST.vue';
import Drawer from '@/components/Drawer.vue';
import getEndPointsByCollection from '@/config/endpoints';

// Reactive State
const showDrawer = ref(false);
const selectedCollection = ref('');
const GET_Requests = ref([]);
const POST_Requests = ref([]);
const show_GET = ref(true);
const show_POST = ref(true);

// Fetch collection data from localStorage
const getCollectionFromStorage = () => {
  selectedCollection.value = localStorage.getItem('selected Collection') || '';
  try {
    const endpoints = getEndPointsByCollection(selectedCollection.value);
    GET_Requests.value = endpoints.GET_Methods;
    POST_Requests.value = endpoints.POST_Methods;
  } catch (e) {
    console.error(e);
    GET_Requests.value = [];
    POST_Requests.value = [];
    selectedCollection.value = 'Error handling Data';
  }
};

// Initialize data
getCollectionFromStorage();

// Toggle Drawer
const toggleDrawer = () => (showDrawer.value = !showDrawer.value);

// Refresh collection when drawer opens/closes
watch(showDrawer, () => getCollectionFromStorage());
</script>

<style scoped>
.collection-container {
  padding: 16px;
  max-width: 900px;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.selected-collection {
  font-weight: 600;
  font-size: 1.2rem;
}

.selected-collection span {
  color: #409eff;
}

.request-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.request-section {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.request-section:hover {
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
}

.request-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: 12px;
}

.request-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
