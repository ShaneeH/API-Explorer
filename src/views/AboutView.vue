<template>
 <img src="@/assets/RestHUBLOGO.png" width="700" height="125" />
    <h4>Change URL</h4>
    <button @click="updateURL()">Update URL</button>

    <h4>Change NAME</h4>
    <button @click="updateNAME()">Update URL</button>

</template>

<script setup>

import editURL from '@/config/editURL';
import editName from '@/config/editName';

function updateURL() {
    console.log('update cliked 1');
    editURL.updateMethodURL('Test Collection', 'T', 'sweeet');
    console.log('update cliked 2');

}

function updateNAME() {
    console.log('update cliked 1');
    editName.updateMethodNAME('Test Collection', 'T', 'NEW NAME WHO DIS');
    console.log('update cliked 2');
}





</script>