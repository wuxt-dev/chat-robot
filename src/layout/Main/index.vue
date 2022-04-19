<template>
  <div class="container" id="app">
    <MessageBox :historyMsg="historyMsg" />
    <InputBox v-model:message="message" :sendMessage="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBox from './MessageBox.vue'
import InputBox from './InputBox.vue'
import store from '@/store/index'
import { socket } from '@/api/socket'

const message = ref('')
const historyMsg = ref([])
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
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
</style>
