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
        v-for="contact in contacts"
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
          @click="handleChat(contact.username)"
        >
          Chat
        </el-button>
      </Userinfo>
    </div>
  </el-card>
</template>

<script setup>
import store from '@/store/index'
import router from '@/router/index'
import { ref } from 'vue'
import Userinfo from './componnets/Userinfo.vue'
import { SwitchButton } from '@element-plus/icons-vue'

const username = store.getters.username
const contacts = ref([
  { id: 1, username: 'robot' },
  { id: 2, username: 'friends' }
])
const handleChat = (username) => {
  store.commit('setChatFriend', username)
  router.push('/chat')
}
const handeLogout = () => {
  store.dispatch('logout')
  router.replace('/login')
}
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
