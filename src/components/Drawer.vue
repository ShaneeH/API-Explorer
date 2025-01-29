<template>
    <el-drawer v-model="visible" title="Manage Collections" :show-close="true" @close="closeDrawer">
      <h3>Request Collection Manager</h3>
  
      <el-form label-width="120px">
        <!-- Dropdown for existing collections -->
        <el-form-item label="Select Collection">
          <el-select v-model="selectedCollection" placeholder="Choose a collection">
            <el-option
              v-for="(collection, index) in collections"
              :key="index"
              :label="collection"
              :value="collection"
            />
          </el-select>
        </el-form-item>
  
        <!-- Add new collection -->
        <el-form-item label="Create New Collection">
          <el-input v-model="newCollectionName" placeholder="Enter collection name" />
          <el-button type="success" @click="createCollection">Create</el-button>
        </el-form-item>
  
        <!-- Add methods to the selected collection -->
        <div v-if="selectedCollection" style="margin-top: 20px;">
          <h4>Add Methods to {{ selectedCollection }}</h4>
          <el-form :model="form" label-width="120px">
            <el-form-item label="Request Name">
              <el-input v-model="form.name" placeholder="Enter request name" />
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="form.url" placeholder="Enter URL" />
            </el-form-item>
            <el-form-item label="HTTP Method">
              <el-select v-model="form.method" placeholder="Select method">
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addMethod">Add Method</el-button>
        </div>
      </el-form>
    </el-drawer>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps({
    showDrawer: Boolean, // Accepts visibility control from parent
  });
  const emit = defineEmits(['update:showDrawer']);
  
  const visible = ref(props.showDrawer);
  
  watch(
    () => props.showDrawer,
    (newVal) => {
      visible.value = newVal;
    }
  );
  
  // When the drawer closes, update the parent
  const closeDrawer = () => {
    visible.value = false;
    emit('update:showDrawer', false);
  };
  
  // Collection management logic
  const collections = ref([]);
  const selectedCollection = ref(null);
  const newCollectionName = ref('');
  const form = reactive({ name: '', url: '', method: '' });
  
  onMounted(() => {
    const storedCollections = JSON.parse(localStorage.getItem('collections')) || {};
    collections.value = Object.keys(storedCollections);
  });
  
  const createCollection = () => {
    if (!newCollectionName.value.trim()) {
      alert('Please enter a valid collection name.');
      return;
    }
    const collectionName = newCollectionName.value.trim();
    const storedCollections = JSON.parse(localStorage.getItem('collections')) || {};
  
    if (storedCollections[collectionName]) {
      alert('Collection already exists.');
      return;
    }
  
    storedCollections[collectionName] = [];
    localStorage.setItem('collections', JSON.stringify(storedCollections));
    collections.value = Object.keys(storedCollections);
    newCollectionName.value = '';
  };
  
  const addMethod = () => {
    if (!selectedCollection.value) {
      alert('Please select a collection first.');
      return;
    }
  
    const storedCollections = JSON.parse(localStorage.getItem('collections')) || {};
    const newMethod = { ...form };
  
    if (!newMethod.name || !newMethod.url || !newMethod.method) {
      alert('Please fill in all fields.');
      return;
    }
  
    storedCollections[selectedCollection.value].push(newMethod);
    localStorage.setItem('collections', JSON.stringify(storedCollections));
    alert(`Added method to ${selectedCollection.value}`);
    form.name = '';
    form.url = '';
    form.method = '';
  };
  </script>
  