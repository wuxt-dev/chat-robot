<template>
  <div class="userinfo">
    <el-avatar v-if="!user.avatar">{{ user.username[0] }}</el-avatar>
    <el-avatar v-else :src="user.avatar"></el-avatar>
    <span>{{ user.username }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  user: Object,
  bgColor: {
    type: String,
    default: '#fff'
  },
  color: {
    type: String,
    default: '#5b6ef9'
  },
  fontSize: {
    type: String,
    default: '30px'
  }
})
</script>

<style scoped>
.userinfo {
  font-size: v-bind(fontSize);
  display: flex;
  justify-content: start;
  align-items: center;
}
.el-avatar {
  margin-right: 10px;
  font-size: 25px;
  background-color: v-bind(bgColor);
  color: v-bind(color);
}
</style>
