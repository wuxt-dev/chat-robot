<template>
  <el-scrollbar ref="msgBox" height="100%" max-height="600px">
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
        <el-avatar
          v-if="isMyMessage(item.username)"
          :src="store.getters.user.avatar"
        ></el-avatar>
        <el-avatar v-else :src="store.getters.chatFriend.avatar"></el-avatar>
        <p class="message">{{ item.msg }}</p>
      </template>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { watch, nextTick, ref, computed } from 'vue'
import store from '@/store/index'

const historyMsg = computed(
  () => store.getters.historyMsg[store.getters.chatFriend.username]
)

const isMyMessage = (username) => {
  if (username === store.getters.username) return 'my-info'
  return ''
}

const msgBox = ref(null)
watch(
  historyMsg,
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
  max-width: 80%;
  padding: 5px 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  border: 1px solid #b9d7ea;
  background-color: #f7fbfc;
  margin: 0 0 15px 10px;
  word-wrap: break-word;
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
  margin: 0 10px 10px 0;
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
