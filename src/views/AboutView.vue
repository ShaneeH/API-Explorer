<template>
 <img src="@/assets/RestHUBLOGO.png" width="700" height="125" />
    <h4>Change URL</h4>
    <button @click="updateURL()">Update URL</button>

    <h4>Change Method</h4>
    <button @click="updateMethod()">Update Method</button>

</template>

<script setup>

import editURL from '@/config/editURL';
import editName from '@/config/editName';
import editMethod from '@/config/editMethod';

function updateURL() {
    console.log('update cliked 1');
    editURL.updateMethodURL('Test Collection', 'T', 'htttp:/get/AllCocks');
    console.log('update cliked 2');

}

function updateMethod() {
    console.log('update cliked 1');
    editMethod.updateMethodType('Test Collection', 'NEW NAME WHO DIS', 'POST');
    console.log('update cliked 2');
}





</script>