<template>
  <div class="chat-header">
    <el-button
      type="primary"
      :icon="ArrowLeftBold"
      size="small"
      circle
      class="back-contact"
      @click="backToContact"
    />
    <span>{{ username }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import router from '@/router/index'
import { socket } from '@/api/socket'
import store from '@/store/index'

defineProps({
  username: String
})

const backToContact = () => {
  socket.emit('leave room', {
    username: store.getters.username,
    room: store.getters.chatRoom
  })
  store.commit('chat/setChatRoom', '')
  router.replace('/contact')
}
</script>

<style scoped>
.chat-header {
  font-size: 20px;
  color: var(--el-color-primary);
  text-align: center;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--el-color-primary-light-5);
  position: relative;
}
.back-contact {
  position: absolute;
  left: 0;
  top: -2px;
}
</style>
