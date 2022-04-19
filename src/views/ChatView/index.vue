<template>
  <div class="container" id="app">
    <ChatHeader :username="chatFriend.username" />
    <MessageBox :historyMsg="historyMsg" />
    <InputBox v-model:message="message" :sendMessage="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBox from './components/MessageBox.vue'
import InputBox from './components/InputBox.vue'
import ChatHeader from './components/ChatHeader.vue'
import store from '@/store/index'
import { socket } from '@/api/socket'

const message = ref('')
const historyMsg = ref([])
const chatFriend = store.getters.chatFriend
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
