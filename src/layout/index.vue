<template>
  <el-container class="layout-container">
    <el-header class="header">
      <Header />
    </el-header>
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
import Header from './Header/index.vue'
import AsideMenu from './AsideMenu/index.vue'
import Main from './Main/index.vue'
</script>

<style scoped>
.layout-container {
  height: 100%;
}
.header {
  background-color: #5b6ef9;
}
.aside {
  background-color: #6b7bf6;
  height: 100%;
}
</style>
