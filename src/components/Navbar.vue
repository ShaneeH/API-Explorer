<template>
  <nav class="navbar">
    <el-row align="middle" justify="space-between" class="navbar-row">
      <!-- Left side -->
      <el-col :span="12" class="navbar-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
      </el-col>

      <!-- Right side -->
      <el-col :span="12" class="navbar-actions" style="text-align: right">
        <el-button @click="toggleDarkMode" circle>
          <i class="pi pi-lightbulb"></i>
        </el-button>
      </el-col>
    </el-row>
  </nav>
</template>

<script setup>
import { useDarkMode } from '@/composables/useDarkMode'

const { toggleDarkMode } = useDarkMode()
</script>

<style scoped>
.navbar {
  background: rgb(245, 238, 223);
  padding: 0.75rem 2rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  border-radius: 0 0 12px 12px;
}

.navbar-row {
  width: 100%;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  font-weight: 500;
  text-decoration: none;
  color: var(--el-text-color-primary);
  transition: color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover {
  color: var(--el-color-primary);
  transform: translateY(-1px);
}

.navbar-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.el-button {
  transition: background 0.2s ease, transform 0.2s ease;
}

.el-button:hover {
  transform: scale(1.1);
}
</style>
