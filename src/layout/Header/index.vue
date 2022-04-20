<template>
  <div class="header-container">
    <div class="userinfo">
      <el-avatar>user</el-avatar>
      <span>{{ store.getters.username }}</span>
    </div>
    <div class="function">
      <el-button :icon="Search" circle color="#5b6ef9" size="large" />
      <el-tooltip effect="light" content="full screen" placement="bottom-start">
        <el-button
          :icon="FullScreen"
          circle
          color="#5b6ef9"
          size="large"
          @click="fullScreen"
        />
      </el-tooltip>
      <el-tooltip effect="light" content="logout" placement="bottom-start">
        <el-button
          :icon="SwitchButton"
          circle
          color="#5b6ef9"
          size="large"
          @click="logout"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { Search, FullScreen, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import screenfull from 'screenfull'
import store from '@/store/index'
import { ref } from 'vue-demi'

const logout = (e) => {
  ElMessageBox.confirm('确定要退出登录吗', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      store.dispatch('user/logout')
    })
    .catch(() => {})
}

const toggleFullScreen = ref(false)

const fullScreen = (e) => {
  toggleFullScreen.value = !toggleFullScreen.value
  if (toggleFullScreen.value) screenfull.request()
  else screenfull.exit()
}
</script>

<style scoped>
.header-container {
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.userinfo {
  font-size: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.el-avatar {
  margin-right: 10px;
}
.function {
  font-size: 20px;
}
</style>
