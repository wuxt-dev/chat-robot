<template>
  <el-menu
    default-active="Chat Bot"
    background-color="#6b7bf6"
    text-color="#fff"
    unique-opened
  >
    <ContactList title="Friends" :contactList="friendList" />
    <ContactList title="Groups" :contactList="[]" />
    <el-sub-menu index="GroupMember">
      <template #title>
        <el-icon><user-filled /></el-icon>
        <span>Group Member</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">xxx</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import ContactList from './ContactList.vue'
import { getFriendList } from '@/api/chat'
import { ref } from 'vue-demi'
import store from '@/store/index'
import { UserFilled } from '@element-plus/icons-vue'
import { joinSocketRoom } from '@/utils/index'
import { socket } from '@/api/socket'

const friendList = ref([])
getFriendList(store.getters.userId)
  .then((res) => {
    const { data } = res
    friendList.value = data.friendList
  })
  .catch()

joinSocketRoom(store.getters.chatFriend, socket)
</script>
<style scoped>
:deep(.el-menu-item.is-active) {
  background-color: #5662c5;
  color: #fff;
}
</style>
