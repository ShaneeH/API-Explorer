<template>

    {{ endpoint.url }}{{ queryString }}
    <button @click="sendParams()"> {{ endpoint.method }}</button>
    <div v-for="(param, index) in queryParams" :key="index" class="param-input">
        <input v-model="param.name" placeholder="Name" />
        <input v-model="param.value" placeholder="Value" />
        <button @click="removeParam(index)">Remove</button>
    </div>
    <button @click="addParam">Add Param</button>

</template>

<script setup>
import { ref, computed } from 'vue';
import qs from 'qs';
import editURL from '@/config/editURL';
let url_final = ref('');

const props = defineProps({
    endpoint: {
        type: Object,
        required: true,
    },
});

const queryParams = ref([{ name: '', value: '' }]);

const addParam = () => {
    queryParams.value.push({ name: '', value: '' });
};

const removeParam = (index) => {
    queryParams.value.splice(index, 1);
};

const queryString = computed(() => {
    const params = queryParams.value
        .filter(param => param.name && param.value)
        .reduce((acc, param) => {
            acc[param.name] = param.value;
            return acc;
        }, {});


    let x = qs.stringify(params, { addQueryPrefix: true });
    url_final.value = props.endpoint.url + x;
    console.log(url_final.value);
    return x;
});

const sendParams = () => {
    let url = url_final.value;
    let method = props.endpoint.method;



    editURL.updateMethodURL(localStorage.getItem('selected Collection'), props.endpoint.name, url);


    console.log('Updated Name');
}



</script>

<style scoped>
.param-input {
    margin-bottom: 10px;
}
</style>