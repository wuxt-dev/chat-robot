<template>
  <div class="header-container">
    <div class="userinfo">
      <el-avatar v-if="!user.avatar">{{ user.username[0] }}</el-avatar>
      <el-avatar v-else :src="user.avatar"></el-avatar>
      <span>{{ user.username }}</span>
    </div>
    <div class="function">
      <el-tooltip
        effect="light"
        content="search for friends"
        placement="bottom-start"
      >
        <el-button
          :icon="Search"
          circle
          color="#5b6ef9"
          size="large"
          @click="dialogVisible = true"
        />
      </el-tooltip>
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
  <teleport to="#dialog">
    <SearchDialog v-model="dialogVisible" />
  </teleport>
</template>

<script setup>
import { Search, FullScreen, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import screenfull from 'screenfull'
import store from '@/store/index'
import { computed, ref } from 'vue-demi'
import SearchDialog from './SearchDialog.vue'

const user = computed(() => store.getters.user)

const dialogVisible = ref(true)

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
  font-size: 25px;
  background-color: #fff;
  color: #5b6ef9;
}
.function {
  font-size: 20px;
}
</style>
