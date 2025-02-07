<template>
    <nav class="navbar">
       
  
        <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="6" class="navbar-title">
                
            </el-col>
            <el-col :span="12" class="navbar-content">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
                <el-button style="margin-left: 30px" @click="toggleDarkMode" text bg>
                    <i class="pi pi-lightbulb"></i>
                </el-button>
            </el-col>
        </el-row>
    </nav>
</template>

<script setup>
import { useDarkMode } from '@/composables/useDarkMode';

const { toggleDarkMode } = useDarkMode();
</script>

<style scoped>
.navbar {
    padding: 10px 0;
}

.navbar-title {
    margin-left: 20px;
    text-align: left;
    font-weight: bolder;
    font-size: 1.5em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}

.navbar-content {
    text-align: right;
    margin-left: 35px;
    margin-right: 35px;

}

.router-link {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    margin-left: 35px;
    margin-right: 35px;
}

.router-link:hover {
    color: #409eff;
}
</style>