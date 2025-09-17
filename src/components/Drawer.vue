<template>
  <el-drawer
    v-model="visible"
    title="Manage Collections"
    :show-close="true"
    @close="closeDrawer"
    :size="drawerSize"
    class="custom-drawer"
  >
    <div class="drawer-content">
      <h3>Request Collection Manager</h3>

      <el-form label-position="top" class="collection-form">
        <el-form-item label="Select Collection">
          <el-select
            v-model="selectedCollection"
            placeholder="Choose a collection"
            class="full-width"
          >
            <el-option
              v-for="collection in collections"
              :key="collection"
              :label="collection"
              :value="collection"
            />
          </el-select>
        </el-form-item>

        <div v-if="selectedCollection" class="methods-section">
          <h4>Add Methods to {{ selectedCollection }}</h4>
          <el-form
            :model="form"
            label-position="top"
            ref="methodForm"
            class="method-form"
          >
            <el-form-item
              label="Request Name"
              prop="name"
              :rules="[{ required: true, message: 'Please enter request name' }]"
            >
              <el-input
                v-model="form.name"
                placeholder="Enter request name"
                class="input-field"
              />
            </el-form-item>
            <el-form-item
              label="URL"
              prop="url"
              :rules="[{ required: true, message: 'Please enter URL' }]"
            >
              <el-input
                v-model="form.url"
                placeholder="Enter URL"
                class="input-field"
              />
            </el-form-item>
            <el-form-item
              label="HTTP Method"
              prop="method"
              :rules="[{ required: true, message: 'Please select method' }]"
            >
              <el-select
                v-model="form.method"
                placeholder="Select method"
                class="full-width"
              >
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
                <el-option label="PUT" value="PUT" />
                <el-option label="DELETE" value="DELETE" />
              </el-select>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            @click="addMethod"
            :disabled="methodAdding"
            class="add-method-button"
          >
            <span v-if="methodAdding" class="el-icon-loading"></span>
            <span v-else>Add Method</span>
          </el-button>
          <div v-if="methodAddedMessage" class="success-message">
            {{ methodAddedMessage }}
          </div>
          <div v-if="methodError" class="error-message">{{ methodError }}</div>
          <el-table
            :data="collectionMethods"
            class="methods-table"
            style="width: 100%"
          >
            <el-table-column prop="method" label="HTTP Method" width="120">
              <template #default="scope">
                <el-tag :type="getTagType(scope.row.method)" class="method-tag">
                  {{ scope.row.method }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="Request Name" width="200" />
            <el-table-column prop="url" label="URL" />
          </el-table>
        </div>

        <el-form-item label="Create New Collection" class="new-collection-section">
          <el-input
            v-model="newCollectionName"
            placeholder="Enter collection name"
            class="input-field"
          />
          <el-button
            type="success"
            @click="createCollection"
            :disabled="!newCollectionName.trim()"
            class="create-button"
          >
            Create
          </el-button>
          <div v-if="collectionExistsError" class="error-message">
            {{ collectionExistsError }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits, watch } from 'vue';
import { ElMessage } from 'element-plus';
import * as collectionsService from '@/services/collections';

const props = defineProps({
  showDrawer: Boolean,
});
const emit = defineEmits(['update:showDrawer']);

const visible = ref(props.showDrawer);
const drawerSize = ref('60%');

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
        await getCollectionMethods();
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
  if (selectedCollection.value) {
    collectionMethods.value = await collectionsService.getMethodsForCollection(selectedCollection.value);
    console.log(selectedCollection.value);
    localStorage.setItem('selected Collection', selectedCollection.value);
  }
};

watch(selectedCollection, getCollectionMethods, { deep: true });

const getTagType = (method) => {
  switch (method) {
    case 'GET':
      return 'success';
    case 'POST':
      return 'warning';
    case 'PUT':
      return 'info';
    case 'DELETE':
      return 'danger';
    default:
      return '';
  }
};
</script>

<style scoped>
.custom-drawer {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background: linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%);
}

.drawer-content {
  padding: 24px;
  max-width: 100%;
  overflow-y: auto;
}

.collection-form {
  margin-bottom: 32px;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.full-width {
  width: 100%;
  max-width: 600px;
}

.input-field {
  max-width: 100%;
  font-size: 15px;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.input-field:hover {
  border-color: #6366f1;
}

:deep(.el-form-item__label) {
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 8px;
  line-height: 1.4;
}

.methods-section {
  margin-top: 32px;
  padding: 20px;
  border-radius: 12px;
  background: #f9faff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.method-form {
  margin-bottom: 20px;
}

.add-method-button {
  margin: 16px 0;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  background: #6366f1;
  border: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.add-method-button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.methods-table {
  margin-top: 24px;
  border-radius: 8px;
  overflow: hidden;
}

.method-tag {
  font-weight: 500;
  border-radius: 6px;
  padding: 6px 12px;
  transition: transform 0.2s ease;
}

.method-tag:hover {
  transform: scale(1.05);
}

.new-collection-section {
  margin-top: 32px;
  padding: 20px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.create-button {
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  background: #10b981;
  border: none;
  transition: background 0.3s ease, transform 0.2s ease;
}

.create-button:hover {
  background: #059669;
  transform: translateY(-1px);
}

h3,
h4 {
  margin-bottom: 16px;
  font-weight: 600;
  color: #1e293b;
  letter-spacing: 0.5px;
}

h3 {
  font-size: 24px;
}

h4 {
  font-size: 18px;
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 400;
}

.success-message {
  color: #10b981;
  font-size: 14px;
  margin-top: 8px;
  font-weight: 400;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .drawer-content {
    padding: 16px;
  }

  .full-width {
    max-width: 100%;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 16px;
  }

  .collection-form,
  .methods-section,
  .new-collection-section {
    padding: 16px;
  }

  :deep(.el-form-item__label) {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .drawer-content {
    padding: 12px;
  }

  h3,
  h4 {
    font-size: 16px;
  }

  .el-form-item__label {
    font-size: 12px;
  }

  .input-field {
    font-size: 14px;
  }

  .add-method-button,
  .create-button {
    padding: 10px 20px;
  }
}
</style>