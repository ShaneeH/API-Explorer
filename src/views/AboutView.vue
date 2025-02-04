<template>

</template>

<script setup>
import getEndPointsByCollection from '@/config/endpoints';

let arr = [] = getEndPointsByCollection('Test Collection').GET_Methods;
console.log(arr);
</script>