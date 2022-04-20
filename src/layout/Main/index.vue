<template>
  <div class="container" id="app">
    <MessageBox />
    <InputBox v-model:message="message" :sendMessage="sendMessage" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MessageBox from './MessageBox.vue'
import InputBox from './InputBox.vue'
import store from '@/store/index'
import { socket } from '@/api/socket'
import { formatMessage } from '@/utils/index'

const message = ref('')
const sendMessage = () => {
  if (message.value.trim()) {
    store.commit('chat/addHistoryMsg', formatMessage(message.value))
    socket.emit('chat message', formatMessage(message.value))
    message.value = ''
  }
}

socket.on('chat message', (msg) => {
  store.commit('chat/addHistoryMsg', msg)
})
socket.on('broadcast', (msg) => {
  store.commit('chat/addHistoryMsg', msg)
})
</script>

<style scoped>
.container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
</style>
