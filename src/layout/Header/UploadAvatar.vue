<template>
  <el-dialog
    :model-value="uploadAvatarVisible"
    title="upload avatars"
    width="50%"
    append-to-body
    @close="dialogClose"
  >
    <el-upload
      ref="upload"
      :action="actionUrl"
      accept=".jpg"
      name="avatar"
      list-type="picture-card"
      :limit="1"
      :on-exceed="handleExceed"
      :auto-upload="false"
      :before-upload="beforeAvatarUpload"
      :on-success="uploadSuccess"
    >
      <el-icon><Plus /></el-icon>
      <template #file="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
      </template>
      <template #tip>
        <div class="el-upload__tip">jpg files</div>
      </template>
    </el-upload>
    <el-button class="submit-button" type="primary" @click="submitUpload">
      upload
    </el-button>
  </el-dialog>
</template>

<script setup>
import { SERVER_ADDRESS } from '@/config/index'
import { genFileId, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import store from '@/store/index'
import router from '@/router/index'

import { computed, ref, defineProps, defineEmits } from 'vue-demi'

const emits = defineEmits(['update:model-value'])
defineProps({
  uploadAvatarVisible: Boolean
})
const actionUrl = computed(
  () => `${SERVER_ADDRESS}/user/avatar/${store.getters.username}`
)

// 覆盖前一个文件
const upload = ref()
const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}

// 检查图片格式
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const submitUpload = () => {
  upload.value.submit()
}

const uploadSuccess = (res) => {
  if (res.status === 1) {
    ElMessage.error(res.message)
  }
  upload.value.clearFiles()
  emits('update:model-value', false)
  router.go(0)
  ElMessage.success(res.message)
}

const dialogClose = () => {
  emits('update:model-value', false)
}
</script>
<style scoped>
.submit-button {
  margin-top: 5px;
  width: 100%;
  text-align: center;
}
</style>
