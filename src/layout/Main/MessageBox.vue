<template>
  <el-scrollbar ref="msgBox" height="450px" max-height="600px">
    <div
      v-for="(item, index) in historyMsg"
      :key="index"
      class="info"
      :class="isMyMessage(item.username)"
    >
      <template v-if="item.username === 'system'">
        <p class="system-message">{{ item.msg }}</p>
      </template>
      <template v-else>
        <p class="username">{{ item.username }}</p>
        <p class="message">{{ item.msg }}</p>
      </template>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { defineProps, watch, nextTick, ref } from 'vue'
import store from '@/store/index'

const props = defineProps({
  historyMsg: Array,
  isMyMessage: Function
})

const isMyMessage = (username) => {
  if (username === store.getters.username) return 'my-info'
  return ''
}

const msgBox = ref(null)
watch(
  () => props.historyMsg,
  () => {
    nextTick(() => {
      msgBox.value.setScrollTop(msgBox.value.wrap$.scrollHeight)
    })
  },
  { deep: true }
)
</script>

<style scoped>
.info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  font-size: 20px;
}
.info .username,
.info .message {
  padding: 5px 5px;
  color: #769fcd;
}
.info .message {
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid #b9d7ea;
  background-color: #f7fbfc;
}

.my-info {
  flex-direction: row-reverse;
  justify-content: end;
}
.my-info .username,
.my-info .message {
  color: #f67280;
}

.my-info .message {
  border: 1px solid #f7ddde;
  background-color: #fcf5ee;
}

.system-message {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  border-radius: 7px;
  text-align: center;
  background-color: rgba(106, 122, 246, 0.2);
  color: rgb(0, 0, 0, 0.5);
}
</style>
