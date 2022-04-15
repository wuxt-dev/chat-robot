<template>
  <div class="user-box">
    <div class="userinfo" v-bind="$attrs">
      <el-avatar :size="size" class="avatar">{{ avatar }}</el-avatar>
      <span class="username">{{ username }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  avatar: String,
  username: String,
  size: Number
})
const fontSize = computed(() => props.size - 20 + 'px')
</script>

<style scoped>
.user-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userinfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.avatar {
  background-color: #409eff;
  font-size: v-bind(fontSize);
}
.username {
  display: inline-block;
  height: var(--el-avatar-size);
  font-size: v-bind(fontSize);
  color: #409eff;
  margin-left: 10px;
}
.bottom-gutter {
  margin-bottom: 10px;
}
</style>
