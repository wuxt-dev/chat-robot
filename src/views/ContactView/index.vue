<template>
  <el-card class="contact-container">
    <template #header>
      <Userinfo
        :username="username"
        :avatar="username[0].toUpperCase()"
        :size="50"
      />
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
          size="small"
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

const username = store.getters.username
const contacts = ref([
  { id: 1, username: 'max' },
  { id: 2, username: 'eric' },
  { id: 3, username: 'monica' }
])
const handleChat = (username) => {
  router.push('/chat')
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
