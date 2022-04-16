<template>
  <div class="container" id="app">
    <ChatHeader :username="store.getters.chatFriend" />
    <MessageBox :historyMsg="historyMsg" />
    <InputBox v-model:message="message" :sendMessage="sendMessage" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import MessageBox from './components/MessageBox.vue'
import InputBox from './components/InputBox.vue'
import ChatHeader from './components/ChatHeader.vue'
import store from '@/store/index'
import socketManager from '@/api/socket'

const message = ref('')
const historyMsg = ref([])
const socketPath = computed(() => {
  const chatFriend = store.getters.chatFriend
  if (chatFriend === 'robot') return `/${chatFriend}`
  return '/friend'
})
const socket = socketManager.socket(socketPath.value)
const sendMessage = () => {
  if (message.value.trim()) {
    historyMsg.value.push({
      username: store.getters.username,
      msg: message.value
    })
    socket.emit('chat message', {
      username: store.getters.username,
      msg: message.value
    })
    message.value = ''
  }
}
socket.on('chat message', (msg) => {
  historyMsg.value.push(msg)
})
socket.on('broadcast', (msg) => {
  historyMsg.value.push(msg)
})
</script>

<style scoped>
.container {
  width: 50%;
  height: 100%;
  margin: 50px auto;
  border: 2px solid var(--el-color-primary);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
