<template>

  <h3>Collection Selected : {{ selectedCollection }}</h3>
  <!-- Button to Open Drawer -->
  <el-button type="primary" @click="toggleDrawer">
    Manage Collections
  </el-button>

  <Drawer v-model:showDrawer="showDrawer" />

  <div class="request_view" style="margin-left: 12px; margin-right: 12px;">
    <h3> GET ({{ GET_Requests.length }}) <el-switch v-model="show_GET" /> </h3>

    <!-- Conditionally render based on switch value -->
    <div v-if="show_GET">
      <div v-for="(endpoint, index) in GET_Requests" :key="index">
        <GET :endpoint="endpoint" />
      </div>
    </div>
    <br>

    <h3> POST ({{ POST_Requests.length }}) <el-switch v-model="show_POST" class="ml-2" style="--el-switch-on-color: #13ce66;" />
    </h3>
    <div v-if="show_POST">
      <div v-for="(endpoint, index) in POST_Requests" :key="index">
        <POST :endpoint="endpoint" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import GET from '@/components/GET.vue';
import POST from '@/components/POST.vue';
import Drawer from '@/components/Drawer.vue';
import getEndPointsByCollection from '@/config/endpoints';
const showDrawer = ref(false);
const selectedCollection = ref('');
const GET_Requests = ref([]);
const POST_Requests = ref([]);


function getCollectionFromStorage() {

  let selectedCollection = localStorage.getItem('selected Collection');

  try {
    GET_Requests.value = getEndPointsByCollection(selectedCollection).GET_Methods;
    POST_Requests.value = getEndPointsByCollection(selectedCollection).POST_Methods;
    
  } catch (e) {
    console.log(e);
    GET_Requests.value = [];
    POST_Requests.value = [];
    selectedCollection.value = "Error handling Data";
  }

}

getCollectionFromStorage()

const toggleDrawer = () => {
  showDrawer.value = true;

};


watch(showDrawer, (newVal) => {
  if (newVal) {
    getCollectionFromStorage();

  } else {
    getCollectionFromStorage();
  }
});



const show_GET = ref(true);
const show_POST = ref(true);
</script>

<style scoped></style>