<template>
  <el-scrollbar ref="msgBox" height="450px" max-height="600px">
    <div
      v-for="(item, index) in historyMsg"
      :key="index"
      class="info"
      :class="isMyMessage(item.username)"
    >
      <p class="username">{{ item.username }}</p>
      <p class="message">{{ item.msg }}</p>
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
}
.info .username,
.info .message {
  padding: 10px 10px;
  color: #409eff;
}
.info .message {
  border: 1px solid #a0cfff;
  border-radius: 4px;
  background-color: #ecf5ff;
  margin-bottom: 10px;
}

.my-info {
  flex-direction: row-reverse;
  justify-content: end;
}
.my-info .username,
.my-info .message {
  color: #529b2e;
}

.my-info .message {
  border: 1px solid #b3e19d;
  background-color: #f0f9eb;
}
</style>
