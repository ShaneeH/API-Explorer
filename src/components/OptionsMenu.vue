<template>
  <el-tabs :tab-position="'left'"  class="custom-tabs">

    <!-- ADD PARAMS TAB -->
    <el-tab-pane label="Query Params">
      <add-params-tab :endpoint="props.endpoint" />
    </el-tab-pane>

    <!-- Edit Query Tab -->
    <el-tab-pane label="Edit Query">
      <edit-query-tab :endpoint="props.endpoint"/>
    </el-tab-pane>

    <!-- Generate Code Tab -->
    <el-tab-pane label="Generate Code">
      Generate Code
    </el-tab-pane>
  </el-tabs>

</template>

<script setup>
import AddParamsTab from './addParamsTab.vue';
import editQueryTab from './editQueryTab.vue';

const props = defineProps({
  //This objects contains [name url method]
  endpoint: {
    type: Object,
    required: true,
  },
});

</script>

<style scoped>
.custom-tabs .el-tabs__item {
  font-size: 15px;
  font-weight: bold;
  color: #7e7e7e;
  padding: 12px;
}

.custom-tabs .el-tabs__item.is-active {
  color: #4a90e2;
}


</style>
