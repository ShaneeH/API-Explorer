<template>
  <el-col :span="7">
    <el-form-item label="Name">
      <el-input v-model="name" @input="markChanged"></el-input>
    </el-form-item>
  </el-col>

  <el-col :span="7">
    <el-form-item label="URL">
      <el-input v-model="url" @input="markChanged"></el-input>
    </el-form-item>
  </el-col>

  <el-col :span="3">
    <el-form-item label="Method">
      <el-select
        v-model="method"
        placeholder="Select Method"
        @change="markChanged"
      >
        <el-option
          v-for="m in methods"
          :key="m"
          :label="m"
          :value="m"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-col>

  <el-button type="primary" :disabled="!isChanged" @click="saveChanges">
    Save Changes
  </el-button>

  <el-button type="danger" @click="confirmDelete">
    Delete Method
  </el-button>
</template>

<script setup>
import { ref } from "vue";
import "element-plus/dist/index.css";
import { ElMessageBox, ElMessage , ElLoading } from "element-plus";

import editMethod from "@/config/editMethod";
import editName from "@/config/editName";
import editURL from "@/config/editURL";
import deleteMethod from "@/config/deleteMethod";

const props = defineProps({
  endpoint: { type: Object, required: true },
});

const name = ref(props.endpoint.name);
const url = ref(props.endpoint.url);
const method = ref(props.endpoint.method);
const isChanged = ref(false);

const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"];

function markChanged() {
  isChanged.value = true;
}



async function saveChanges() {
  const loading = ElLoading.service({
    lock: true,
    text: "Saving changes...",
    background: "rgba(0, 0, 0, 0.3)",
  });

  try {
    const collection = localStorage.getItem("selected Collection");
    editURL.updateMethodURL(collection, props.endpoint.name, url.value);
    editMethod.updateMethodType(collection, props.endpoint.name, method.value);
    editName.updateMethodNAME(collection, props.endpoint.name, name.value);

    // Simulate a short delay for smoother UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    isChanged.value = false; // reset change flag

    ElMessage({
      type: "success",
      message: "Changes saved successfully!",
    });
  } catch (err) {
    console.error(err);
    ElMessage({
      type: "error",
      message: "Failed to save changes",
    });
  } finally {
    loading.close();
    
 
  }
}

function confirmDelete() {
  ElMessageBox.confirm(
    `Are you sure you want to delete the method "${props.endpoint.name}"?`,
    "Confirm Deletion",
    {
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      const collection = localStorage.getItem("selected Collection");
      deleteMethod.removeMethodFromCollection(
        collection,
        props.endpoint.name
      );
      ElMessage({
        type: "success",
        message: "Method deleted successfully",
      });
 
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Deletion canceled",
      });
    });
}
</script>
