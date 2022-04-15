<template>
  <div class="container" id="app">
    <el-scrollbar ref="msgBox" height="400px">
      <p
        v-for="(item, index) in historyMsg"
        :key="index"
        class="message"
        :class="isMyMessage(item.name)"
      >
        {{ item.name }}：{{ item.msg }}
      </p>
    </el-scrollbar>
    <el-row>
      <el-col :span="20">
        <el-input
          autocomplete="off"
          v-model.trim="message"
          @keyup.enter="sendMessage"
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="sendMessage" class="button"
          >Send</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { io } from 'socket.io-client'

const message = ref('')
const historyMsg = ref([])
const sendMessage = () => {
  if (message.value) {
    historyMsg.value.push({
      name: 'you',
      msg: message.value
    })
    nextTick(() => {
      msgBox.value.setScrollTop(msgBox.value.wrap$.scrollHeight)
    })
    socket.emit('chat message', message.value)
    message.value = ''
  }
}
const isMyMessage = (name) => {
  if (name === 'you') return 'my-message'
  return ''
}

const socket = io('http://127.0.0.1:3000')
socket.on('chat message', (msg) => {
  historyMsg.value.push(msg)
  nextTick(() => {
    msgBox.value.setScrollTop(msgBox.value.wrap$.scrollHeight)
  })
})

const msgBox = ref(null)
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

.message {
  display: flex;
  align-items: center;
  margin: 10px;
  padding: 10px 10px;
  justify-content: start;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.my-message {
  justify-content: end;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.button {
  width: 100%;
}
</style>
