<template>
  <el-container class="layout-container">
    <el-header class="header">{{ store.getters.username }}</el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <AsideMenu />
      </el-aside>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import store from '@/store/index'
import AsideMenu from './AsideMenu/index.vue'
import Main from './Main/index.vue'
</script>

<style scoped>
.layout-container {
  height: 100%;
}
.header {
  background-color: #5b6ef9;
  font-size: 30px;
  color: #fff;
  display: flex;
  align-items: center;
}
.aside {
  background-color: #6b7bf6;
  height: 100%;
}
</style>
