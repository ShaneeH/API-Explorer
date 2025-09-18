<template>
  <div id="app">

    <router-view />
  </div>
</template>

<script setup>
import { provideDarkMode } from '@/composables/useDarkMode';
import Navbar from '@/components/Navbar.vue';

provideDarkMode();
</script>

<style>
/* Light Mode Styles */
body {
  background-color: #faf5eb;
  color: rgb(59, 59, 59);
}

/* Dark Mode Styles */
body.dark-mode {
  background-color: rgb(27, 27, 27);
  color: rgb(235, 235, 235);
}

/* Add your other global styles here */

#app {
font-family: 'Fredoka', 'Arial Rounded MT Bold', Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 21px;
}

nav a.router-link-exact-active {
  color: #ffde59;
  font-weight: bold;
  font-size: 21px;
}

nav a.dark-mode {
  font-weight: bold;
  color: #f5f5f5;
  font-size: 21px;
}
</style>
