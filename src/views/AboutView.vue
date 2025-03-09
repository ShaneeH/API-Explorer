<template>
 
    <h4>Change URL</h4>
    <button @click="updateURL()">Update URL</button>

    <h4>Change Method</h4>
    <button @click="updateMethod()">Update Method</button>


  <div class="about-container">
    <img src="@/assets/RestHUBLOGO.png" alt="REST Hub Logo" class="logo" />
    <h2 class="headline">
      Your new go-to web tool for effortless API testing!
    </h2>
    <p class="description">
      REST Hub makes working with APIs simple and fun. With features like <strong>easy query parameter customization</strong>, 
      <strong>quick method execution</strong>, and <strong>real-time response preview</strong>, you can get things done in no time!  
      Whether you're a developer, tester, or just working with APIs, REST Hub is designed for speed, ease of use, and efficiency. 
      It's lightweight, web-based, and built to help you get the job done with minimal hassle.
    </p>
  </div>
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

<style scoped>
.about-container {
  text-align: center;
  color: #333;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.logo {
  width: 700px;
  height: auto;
  margin-bottom: 20px;
}

.headline {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.description {
  font-size: 18px;
  line-height: 1.6;
}
</style>