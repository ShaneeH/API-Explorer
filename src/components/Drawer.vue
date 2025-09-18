<template>
  <el-drawer
    v-model="visible"
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

        <div v-if="selectedCollection" class="methods-section">
          <h5>Add Request to {{ selectedCollection }}</h5>
          <el-form
            :model="form"
            label-position="top"
            ref="methodForm"
            class="method-form"
            @close="closeDrawer"
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
const drawerSize = ref('70%');

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
/* Styles the entire drawer with a modern font and subtle gradient background */
.custom-drawer {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; /* Modern Poppins font with system fallbacks */
  -webkit-font-smoothing: antialiased; /* Smooths font rendering on WebKit browsers */
  -moz-osx-font-smoothing: grayscale; /* Smooths font rendering on Firefox for macOS */
  text-rendering: optimizeLegibility; /* Improves text rendering quality */
  background: linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%); /* Subtle gradient for a modern look */
}

/* Container for drawer content with padding and scrollable overflow */
.drawer-content {
  padding: 24px; /* Adds space around content */
  max-width: 100%; /* Ensures content fits within drawer */
  overflow-y: auto; /* Allows scrolling if content overflows */
}

/* Styles the main form section with a card-like appearance */
.collection-form {
  margin-bottom: 32px; /* Space below the form */
  background: #ffffff; /* White background for card effect */
  padding: 20px; /* Inner padding for content */
  border-radius: 12px; /* Rounded corners for a modern look */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow for depth */
}

/* Ensures select and input fields take full available width with a max limit */
.full-width {
  width: 80%; /* Full width for responsiveness */
  max-width: 500px; /* Limits width for better readability */
}

/* Styles input fields with consistent font size and hover effects */
.input-field {
  max-width: 100%; /* Full width within parent */
  font-size: 15px; /* Readable font size */
  border-radius: 8px; /* Rounded corners for modern look */
  transition: border-color 0.3s ease; /* Smooth border color change on hover */
}

/* Hover effect for input fields */
.input-field:hover {
  border-color: #6366f1; /* Indigo border on hover for visual feedback */
}

/* Styles form labels (deep selector for Element Plus components) */
:deep(.el-form-item__label) {
  font-size: 14px; /* Slightly smaller font for labels */
  font-weight: 500; /* Medium weight for emphasis */
  color: #1e293b; /* Dark slate color for contrast */
  margin-bottom: 8px; /* Space below labels */
  line-height: 1.4; /* Improved line height for readability */
}

/* Styles the methods section with a card-like appearance */
.methods-section {
  margin-top: 32px; /* Space above the section */
  padding: 20px; /* Inner padding */
  border-radius: 12px; /* Rounded corners */
  background: #f9faff; /* Light indigo tint for background */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Subtle shadow for depth */
}

/* Styles the method form with spacing below */
.method-form {
  margin-bottom: 20px; /* Space below the form */
}

/* Styles the Add Method button with modern design */
.add-method-button {
  margin: 16px 0; /* Vertical spacing */
  padding: 12px 24px; /* Comfortable padding for clickability */
  border-radius: 8px; /* Rounded corners */
  font-weight: 500; /* Medium font weight for emphasis */
  background: #6366f1; /* Indigo background */
  border: none; /* Removes default border */
  transition: background 0.3s ease, transform 0.2s ease; /* Smooth color and lift effects */
}

/* Hover effect for Add Method button */
.add-method-button:hover {
  background: #4f46e5; /* Darker indigo on hover */
  transform: translateY(-1px); /* Slight lift for interactivity */
}

/* Styles the table displaying methods */
.methods-table {
  margin-top: 24px; /* Space above table */
  border-radius: 8px; /* Rounded corners */
  overflow: hidden; /* Ensures rounded corners apply to table */
}

/* Styles HTTP method tags in the table */
.method-tag {
  font-weight: 500; /* Medium weight for readability */
  border-radius: 6px; /* Rounded corners */
  padding: 6px 12px; /* Comfortable padding */
  transition: transform 0.2s ease; /* Smooth zoom effect on hover */
}

/* Hover effect for method tags */
.method-tag:hover {
  transform: scale(1.05); /* Slight zoom for interactivity */
}

/* Styles the Create New Collection section */
.new-collection-section {
  margin-top: 32px; /* Space above section */
}

/* Styles the Create button */
.create-button {
  margin-top: 16px; /* Space above button */
  padding: 12px 24px; /* Comfortable padding */
  border-radius: 8px; /* Rounded corners */
  font-weight: 500; /* Medium weight for emphasis */
  border: none; /* Removes default border */
  transition: background 0.3s ease, transform 0.2s ease; /* Smooth color and lift effects */
}

/* Hover effect for Create button */
.create-button:hover {
  background: #059669; /* Darker emerald green on hover */
  transform: translateY(-1px); /* Slight lift for interactivity */
}

/* Styles heading elements */
h3,
h4 {
  margin-bottom: 16px; /* Space below headings */
  font-weight: 600; /* Bold weight for emphasis */
  color: #384c6e; /* Dark blue for contrast */
  letter-spacing: 0.5px; /* Subtle spacing for modern look */
}

/* Styles h3 heading */
h3 {
  font-size: 24px; /* Larger size for main title */
}

/* Styles h4 heading */
h4 {
  font-size: 18px; /* Smaller size for section title */
}

/* Styles error messages */
.error-message {
  color: #ef4444; /* Vibrant red for visibility */
  font-size: 14px; /* Readable size */
  margin-top: 8px; /* Space above message */
  font-weight: 400; /* Regular weight for softer appearance */
}

/* Styles success messages */
.success-message {
  color: #10b981; /* Emerald green for positive feedback */
  font-size: 14px; /* Readable size */
  margin-top: 8px; /* Space above message */
  font-weight: 400; /* Regular weight for softer appearance */
}

/* Responsive adjustments for tablets and smaller screens */
@media (max-width: 768px) {
  /* Reduces padding in drawer content */
  .drawer-content {
    padding: 16px;
  }

  /* Ensures inputs and selects take full width */
  .full-width {
    max-width: 100%;
  }

  /* Reduces h3 font size */
  h3 {
    font-size: 20px;
  }

  /* Reduces h4 font size */
  h4 {
    font-size: 16px;
  }

  /* Reduces padding in form and sections */
  .collection-form,
  .methods-section,
  .new-collection-section {
    padding: 16px;
  }

  /* Reduces label font size */
  :deep(.el-form-item__label) {
    font-size: 13px;
  }
}

/* Responsive adjustments for mobile screens */
@media (max-width: 480px) {
  /* Further reduces padding in drawer content */
  .drawer-content {
    padding: 12px;
  }

  /* Reduces heading font sizes */
  h3,
  h4 {
    font-size: 16px;
  }

  /* Reduces label font size */
  .el-form-item__label {
    font-size: 12px;
  }

  /* Reduces input field font size */
  .input-field {
    font-size: 14px;
  }

  /* Reduces button padding for smaller screens */
  .add-method-button,
  .create-button {
    padding: 10px 20px;
  }
}
</style>