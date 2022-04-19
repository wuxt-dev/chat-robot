<template>
  <el-card class="contact-container">
    <template #header>
      <Userinfo
        :username="username"
        :avatar="username[0].toUpperCase()"
        :size="50"
      >
        <el-tooltip content="logout" placement="bottom-end" effect="light">
          <el-button
            type="primary"
            size="small"
            circle
            :icon="SwitchButton"
            @click="handeLogout"
          />
        </el-tooltip>
      </Userinfo>
    </template>
    <div class="contacts">
      <Userinfo
        v-for="contact in friendList"
        :key="contact.id"
        :username="contact.username"
        :avatar="contact.username[0].toUpperCase()"
        :size="35"
        class="bottom-gutter"
      >
        <el-button
          type="primary"
          plain
          round
          class="function"
          @click="handleChat(contact)"
        >
          Chat
        </el-button>
      </Userinfo>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { SwitchButton } from '@element-plus/icons-vue'
import store from '@/store/index'
import router from '@/router/index'
import Userinfo from './componnets/Userinfo.vue'
import { socket } from '@/api/socket'
import { getFriendList } from '@/api/chat'

const username = store.getters.username

const handleChat = (friend) => {
  store.commit('chat/setChatFriend', friend)
  const userId = store.getters.userId
  const socketRoom =
    userId > friend.id ? `${userId}-${friend.id}` : `${friend.id}-${userId}`
  socket.emit('join room', {
    room: socketRoom,
    username: store.getters.username
  })
  store.commit('chat/setChatRoom', socketRoom)
  router.push('/chat')
}

const handeLogout = () => {
  store.dispatch('user/logout')
  router.replace('/login')
}
const friendList = ref([{ id: 0, username: 'Chat Bot' }])

getFriendList(store.getters.userId)
  .then((res) => {
    const { data } = res
    friendList.value = data.friendList
  })
  .catch()
</script>

<style scoped>
.contact-container {
  width: 50%;
  height: 100%;
  margin: 50px auto;
  padding: 10px;
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}
</style>
