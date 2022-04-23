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
        v-for="friend in contactList"
        :index="friend.username"
        :key="friend.id"
        @click="handleChat(friend)"
      >
        <el-avatar v-if="!friend.avatar" size="small">
          {{ friend.username[0] }}
        </el-avatar>
        <el-avatar v-else :src="friend.avatar" size="small"></el-avatar>
        <span>{{ friend.username }}</span>
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

<style scoped>
.el-avatar {
  font-weight: bold;
  margin-right: 10px;
  background-color: #fff;
  color: #5b6ef9;
}
</style>
