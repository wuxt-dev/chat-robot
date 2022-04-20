<template>
  <el-sub-menu :index="title">
    <template #title>
      <el-icon>
        <component :is="icon"></component>
      </el-icon>
      <span>{{ title }}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item
        :index="friend.username"
        v-for="friend in contactList"
        :key="friend.id"
        @click="handleChat(friend)"
      >
        {{ friend.username }}
      </el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { ChatDotRound, Connection, UserFilled } from '@element-plus/icons-vue'
import { joinSocketRoom } from '@/utils/index'
import store from '@/store/index'
import { socket } from '@/api/socket'

const props = defineProps({
  title: String,
  contactList: Array
})
const icon = computed(() => {
  switch (props.title) {
    case 'Friends':
      return ChatDotRound
    case 'Groups':
      return Connection
    default:
      return UserFilled
  }
})
const handleChat = (friend) => {
  socket.emit('leave room', {
    username: store.getters.username,
    room: store.getters.chatRoom
  })
  joinSocketRoom(friend, socket)
}
</script>

<style scoped></style>
