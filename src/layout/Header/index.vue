<template>
  <div class="header-container">
    <Userinfo :user="user" @click="uploadAvatarVisible = true" />
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
          @click="searchDialogVisible = true"
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
  <SearchDialog v-model="searchDialogVisible" />
  <UploadAvatar v-model="uploadAvatarVisible" />
</template>

<script setup>
import { Search, FullScreen, SwitchButton } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import screenfull from 'screenfull'
import store from '@/store/index'
import { computed, ref } from 'vue-demi'
import SearchDialog from './SearchDialog.vue'
import Userinfo from './Userinfo.vue'
import UploadAvatar from './UploadAvatar.vue'

const user = computed(() => store.getters.user)

const searchDialogVisible = ref(false)
const uploadAvatarVisible = ref(false)

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

.function {
  font-size: 20px;
}
</style>
