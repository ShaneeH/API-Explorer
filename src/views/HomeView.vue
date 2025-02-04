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
const showDrawer = ref(false);
const selectedCollection = ref('');
const GET_Requests = ref([]);
const POST_Requests = ref([]);


function getCollectionFromStorage() {
  // Get the currently selected collection
  let selectedCollection = localStorage.getItem('selected Collection');

  // Get all collections from localStorage
  let allCollections = JSON.parse(localStorage.getItem('collections'));

  // Ensure the collection exists before accessing it
  if (allCollections && allCollections[selectedCollection]) {
    let selectedData = allCollections[selectedCollection]; // Full collection data

    // Create separate arrays for GET and POST requests
    let getRequests = [];
    let postRequests = [];

     GET_Requests.value = [];
     POST_Requests.value = [];


    // Iterate through the selected collection
    selectedData.forEach(item => {
      if (item.method === "GET") {
        getRequests.push(item);
        GET_Requests.value.push(item);
      } else if (item.method === "POST") {
        postRequests.push(item);
        POST_Requests.value.push(item);
      }
    });

    console.log("GET Requests:", getRequests);
    console.log("POST Requests:", postRequests);

    return { getRequests, postRequests }; // Return the categorized data
  } else {
    console.error("Selected collection not found in storage.");
    return { getRequests: [], postRequests: [] };
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