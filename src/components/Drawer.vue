<template>
    <el-drawer v-model="visible" title="Manage Collections" :show-close="true" @close="closeDrawer">
      <h3>Request Collection Manager</h3>
  
      <el-form label-width="120px">
        <el-form-item label="Select Collection">
          <el-select v-model="selectedCollection" placeholder="Choose a collection">
            <el-option
              v-for="collection in collections"
              :key="collection"
              :label="collection"
              :value="collection"
            />
          </el-select>
        </el-form-item>
  
        <div v-if="selectedCollection" style="margin-top: 20px;">
          <h4>Add Methods to {{ selectedCollection }}</h4>
          <el-form :model="form" label-width="120px" ref="methodForm">
            <el-form-item label="Request Name" prop="name" :rules="[{ required: true, message: 'Please enter request name' }]">
              <el-input v-model="form.name" placeholder="Enter request name" />
            </el-form-item>
            <el-form-item label="URL" prop="url" :rules="[{ required: true, message: 'Please enter URL' }]">
              <el-input v-model="form.url" placeholder="Enter URL" />
            </el-form-item>
            <el-form-item label="HTTP Method" prop="method" :rules="[{ required: true, message: 'Please select method' }]">
              <el-select v-model="form.method" placeholder="Select method">
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="addMethod" :disabled="methodAdding">
            <span v-if="methodAdding" class="el-icon-loading"></span>
            <span v-else>Add Method</span>
          </el-button>
          <div v-if="methodAddedMessage" class="success-message">{{ methodAddedMessage }}</div>
          <div v-if="methodError" class="error-message">{{ methodError }}</div>
  
          <h3>Current Methods: </h3>
          <p>{{ collectionMethods }}</p>
        </div>
      </el-form>
  
      <el-form-item label="Create New Collection">
        <el-input v-model="newCollectionName" placeholder="Enter collection name" />
        <el-button type="success" @click="createCollection" :disabled="!newCollectionName.trim()">Create</el-button>
        <div v-if="collectionExistsError" class="error-message">{{ collectionExistsError }}</div>
      </el-form-item>
    </el-drawer>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, defineProps, defineEmits, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import * as collectionsService from '@/services/collections';  // Importing collections service
  
  const props = defineProps({
    showDrawer: Boolean,
  });
  const emit = defineEmits(['update:showDrawer']);
  
  const visible = ref(props.showDrawer);
  
  watch(() => props.showDrawer, (newVal) => {
    visible.value = newVal;
  });
  
  const closeDrawer = () => {
    visible.value = false;
    emit('update:showDrawer', false);
  };
  
  const collections = ref([]);
  const selectedCollection = ref(null);
  const newCollectionName = ref('');
  const collectionExistsError = ref(null);
  const methodError = ref(null);
  const methodAddedMessage = ref(null);
  const methodAdding = ref(false);
  const collectionMethods = ref([]);
  
  const form = reactive({ name: '', url: '', method: '' });
  const methodForm = ref(null);
  
  onMounted(() => {
    loadCollections();
  });
  
  const loadCollections = async () => {
    collections.value = await collectionsService.getCollections();

  };
  
  const createCollection = async () => {
    collectionExistsError.value = null;
    if (!newCollectionName.value.trim()) {
      return;
    }
  
    const collectionName = newCollectionName.value.trim();
    const success = await collectionsService.createCollection(collectionName);
    if (success) {
      loadCollections();
      newCollectionName.value = '';
      ElMessage.success('Collection created successfully!');
    } else {
      collectionExistsError.value = 'Collection already exists.';
    }
  };
  
  const addMethod = async () => {
    methodError.value = null;
    methodAddedMessage.value = null;
    if (!selectedCollection.value) {
      methodError.value = 'Please select a collection first.';
      return;
      
    }
  
    methodForm.value.validate(async (valid) => {
      if (valid) {
        methodAdding.value = true;
        const success = await collectionsService.addMethodToCollection(selectedCollection.value, form);
        if (success) {
          methodAddedMessage.value = `Added method to ${selectedCollection.value}`;
          form.name = '';
          form.url = '';
          form.method = '';
          methodForm.value.resetFields();
        } else {
          methodError.value = 'Failed to add method.';
        }
        methodAdding.value = false;
      } else {
        methodError.value = 'Please fill in all required fields.';
      }
    });
  };

  const getCollectionMethods = async () => {
    collectionMethods.value = await collectionsService.getMethodsForCollection(selectedCollection.value);

    }

  watch(selectedCollection,  getCollectionMethods, { deep: true });
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    margin-top: 5px;
  }
  .success-message {
    color: green;
    margin-top: 5px;
  }
  </style>
  